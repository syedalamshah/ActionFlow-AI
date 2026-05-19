from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging
from .models import ExtractRequest, ExtractionResult, InsightGeneratorResult, AnalyzerResult, RecommenderResult
from .agent import extract_content, generate_insights, analyze_impact, generate_actions

app = FastAPI(title="Action Flow - Content Extractor Agent API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger("API")

@app.post("/extract", response_model=ExtractionResult)
async def extract_endpoint(request: ExtractRequest):
    logger.info("Received POST /extract request")
    try:
        result = extract_content(request.content)
        return result
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        logger.error(f"Server error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

@app.post("/insights", response_model=InsightGeneratorResult)
async def insights_endpoint(request: ExtractionResult):
    logger.info("Received POST /insights request")
    try:
        result = generate_insights(request)
        return result
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        logger.error(f"Server error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

@app.post("/impact", response_model=AnalyzerResult)
async def impact_endpoint(request: InsightGeneratorResult):
    logger.info("Received POST /impact request")
    try:
        result = analyze_impact(request)
        return result
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        logger.error(f"Server error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

@app.post("/actions", response_model=RecommenderResult)
async def actions_endpoint(request: AnalyzerResult):
    logger.info("Received POST /actions request")
    try:
        result = generate_actions(request)
        return result
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        logger.error(f"Server error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
