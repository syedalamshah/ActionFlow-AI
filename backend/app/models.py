from pydantic import BaseModel, Field
from typing import List, Optional

class ExtractRequest(BaseModel):
    content: str = Field(..., description="Raw text or pasted report to be extracted")

class ExtractionResult(BaseModel):
    key_facts: List[str] = Field(description="List of key facts extracted from the content")
    data_points: List[str] = Field(description="List of specific data points or metrics")
    signals: List[str] = Field(description="Business signals, trends, or potential opportunities/risks")
    source_type: str = Field(description="Inferred type of the source content, e.g., 'Sales Report', 'News Article', 'Financial Statement'")

class Insight(BaseModel):
    title: str = Field(description="Title of the insight")
    detail: str = Field(description="Detailed explanation avoiding simple summarization, focusing on patterns and anomalies")
    confidence_score: float = Field(description="Confidence score between 0.0 and 1.0")

class InsightGeneratorResult(BaseModel):
    insights: List[Insight] = Field(description="List of top 3 non-generic business insights")
class ImpactAnalysis(BaseModel):
    insight_title: str = Field(description="Title of the corresponding insight being analyzed")
    business_consequence: str = Field(description="Real-world financial or operational consequence of the insight")
    urgency_level: str = Field(description="Urgency level: 'High', 'Medium', or 'Low'")
    estimated_loss_or_gain: str = Field(description="Estimated financial or operational loss or gain (e.g., '+$50k', '-$10k', 'Unknown')")
    time_sensitivity: str = Field(description="Time sensitivity or deadline for action")

class AnalyzerResult(BaseModel):
    impact_analyses: List[ImpactAnalysis] = Field(description="List of impact analyses for the extracted insights")
    cross_cutting_themes: List[str] = Field(description="Themes or correlations identified across multiple insights")

class ActionRecommendation(BaseModel):
    title: str = Field(description="Short title for the action")
    priority: int = Field(description="Priority rank (1 is highest)")
    budget_estimate: str = Field(description="Estimated budget required for the action (e.g., '$500', 'None')")
    deadline: str = Field(description="Deadline for completing the action")
    responsible_team: str = Field(description="Team or role responsible for executing the action")
    expected_outcome: str = Field(description="What is expected to happen if this action is taken")

class RecommenderResult(BaseModel):
    recommendations: List[ActionRecommendation] = Field(description="Prioritized list of 3-5 action recommendations")

class SimulationResult(BaseModel):
    action_title: str = Field(description="Title of the action being simulated")
    simulated_service: str = Field(description="The service being simulated (e.g., 'Salesforce', 'SendGrid', 'Slack')")
    status: str = Field(description="Status of the simulation (e.g., 'Success', 'Failed')")
    mock_response: str = Field(description="A mock JSON or text response from the simulated service")
    timestamp: str = Field(description="Timestamp of the simulation execution")

class BeforeAfterOutcome(BaseModel):
    metric: str = Field(description="The metric being affected")
    before_value: str = Field(description="Value before the action")
    after_value: str = Field(description="Projected value after the action")
    change_pct: str = Field(description="Percentage change (e.g., '+15%')")
    explanation: str = Field(description="Why this change is expected")

class SimulatorResult(BaseModel):
    simulations: List[SimulationResult] = Field(description="Results of simulating the recommendations")
    outcomes: List[BeforeAfterOutcome] = Field(description="Projected before and after outcomes")

class FullAnalysisResponse(BaseModel):
    extraction: ExtractionResult
    analysis: AnalyzerResult
    recommendations: RecommenderResult
    simulation: SimulatorResult
