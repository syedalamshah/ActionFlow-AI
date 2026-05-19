import os
import logging
from google import genai
from pydantic import ValidationError
from .models import ExtractionResult, InsightGeneratorResult, AnalyzerResult, RecommenderResult
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("ExtractorAgent")

def extract_content(text: str) -> ExtractionResult:
    logger.info("Starting extraction process.")
    
    if not text or not text.strip():
        logger.error("Input text is empty.")
        raise ValueError("Input content cannot be empty.")
        
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or api_key == "your_api_key_here":
        logger.error("GEMINI_API_KEY is not properly set.")
        raise ValueError("Gemini API key is not configured.")

    logger.info("Initializing Gemini client.")
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are an expert business analyst and data extractor. 
    Analyze the following content and extract the structured information requested.
    If the content is irrelevant or contains no meaningful business data, return empty lists and set the source_type to 'Irrelevant'.
    
    Content:
    {text}
    """
    
    logger.info("Calling Gemini API with structured output schema.")
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ExtractionResult,
                temperature=0.1
            ),
        )
        logger.info("Received response from Gemini API.")
        
        # Parse the JSON string back to a Pydantic model
        result = ExtractionResult.model_validate_json(response.text)
        
        if result.source_type.lower() == 'irrelevant':
             logger.warning("Content was deemed irrelevant by the model.")
        else:
             logger.info(f"Successfully extracted {len(result.key_facts)} facts, {len(result.data_points)} data points, {len(result.signals)} signals.")
             logger.info(f"Inferred source type: {result.source_type}")
             
        return result
        
    except ValidationError as e:
        logger.error(f"Failed to parse Gemini response: {e}")
        raise ValueError("Received invalid format from AI model.")
    except Exception as e:
        logger.error(f"Error during Gemini API call: {e}")
        raise RuntimeError(f"Failed to process content: {str(e)}")

def generate_insights(extraction: ExtractionResult) -> InsightGeneratorResult:
    logger.info("Starting insight generation process.")
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or api_key == "your_api_key_here":
        logger.error("GEMINI_API_KEY is not properly set.")
        raise ValueError("Gemini API key is not configured.")

    logger.info("Initializing Gemini client for insights.")
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are an expert strategic business analyst. 
    Review the following extracted data and generate the top 3 non-generic business insights.
    DO NOT simply summarize the data. Instead, find hidden patterns, correlations, and anomalies.
    
    Extracted Data:
    {extraction.model_dump_json(indent=2)}
    """
    
    logger.info("Calling Gemini API for insight generation.")
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=InsightGeneratorResult,
                temperature=0.4
            ),
        )
        logger.info("Received response from Gemini API for insights.")
        
        result = InsightGeneratorResult.model_validate_json(response.text)
        logger.info(f"Successfully generated {len(result.insights)} insights.")
        return result
        
    except ValidationError as e:
        logger.error(f"Failed to parse Gemini response for insights: {e}")
        raise ValueError("Received invalid format from AI model.")
    except Exception as e:
        logger.error(f"Error during Gemini API call for insights: {e}")
        raise RuntimeError(f"Failed to generate insights: {str(e)}")

def analyze_impact(insights: InsightGeneratorResult) -> AnalyzerResult:
    logger.info("Starting impact analysis process.")
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or api_key == "your_api_key_here":
        logger.error("GEMINI_API_KEY is not properly set.")
        raise ValueError("Gemini API key is not configured.")

    logger.info("Initializing Gemini client for impact analysis.")
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are an expert financial and operational risk analyst.
    Analyze the following business insights and determine their real-world impact.
    For each insight, evaluate the business consequence, urgency level, estimated loss or gain, and time sensitivity.
    Additionally, identify any cross-cutting themes across the insights.
    
    Business Insights:
    {insights.model_dump_json(indent=2)}
    """
    
    logger.info("Calling Gemini API for impact analysis.")
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=AnalyzerResult,
                temperature=0.3
            ),
        )
        logger.info("Received response from Gemini API for impact analysis.")
        
        result = AnalyzerResult.model_validate_json(response.text)
        logger.info(f"Successfully analyzed impact for {len(result.impact_analyses)} insights.")
        return result
        
    except ValidationError as e:
        logger.error(f"Failed to parse Gemini response for impact analysis: {e}")
        raise ValueError("Received invalid format from AI model.")
    except Exception as e:
        logger.error(f"Error during Gemini API call for impact analysis: {e}")
        raise RuntimeError(f"Failed to analyze impact: {str(e)}")

def generate_actions(impact_analysis: AnalyzerResult) -> RecommenderResult:
    logger.info("Starting action generation process.")
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or api_key == "your_api_key_here":
        logger.error("GEMINI_API_KEY is not properly set.")
        raise ValueError("Gemini API key is not configured.")

    logger.info("Initializing Gemini client for action generation.")
    client = genai.Client(api_key=api_key)
    
    prompt = f"""
    You are an expert strategic business operator.
    Based on the following impact analysis, generate a prioritized list of 3-5 concrete, realistic, and domain-relevant actions.
    For each action, provide a title, priority, budget estimate, deadline, responsible team, and expected outcome.
    Ensure actions address the most urgent and impactful insights.
    
    Impact Analysis:
    {impact_analysis.model_dump_json(indent=2)}
    """
    
    logger.info("Calling Gemini API for action generation.")
    
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=genai.types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=RecommenderResult,
                temperature=0.4
            ),
        )
        logger.info("Received response from Gemini API for action generation.")
        
        result = RecommenderResult.model_validate_json(response.text)
        logger.info(f"Successfully generated {len(result.recommendations)} recommended actions.")
        return result
        
    except ValidationError as e:
        logger.error(f"Failed to parse Gemini response for actions: {e}")
        raise ValueError("Received invalid format from AI model.")
    except Exception as e:
        logger.error(f"Error during Gemini API call for actions: {e}")
        raise RuntimeError(f"Failed to generate actions: {str(e)}")
