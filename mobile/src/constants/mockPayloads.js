export const SCENARIO_A_DATA = {
  extraction: {
    key_facts: [
      "Sales in the Lahore region experienced a significant decline.",
      "There has been a sharp increase in customer complaints.",
      "A competitor recently introduced an aggressive pricing strategy."
    ],
    data_points: [
      "Lahore region sales dropped 25% (April)",
      "Customer complaints increased by 40%"
    ],
    signals: [
      "High churn risk due to deteriorating customer satisfaction.",
      "Price sensitivity in the market is actively being exploited by a competitor.",
      "Potential correlation between competitor pricing, product/service quality drops, and lost revenue."
    ],
    source_type: "Internal Operations & Sales Update"
  },
  insights: {
    insights: [
      {
        title: "Compounded Defection Vulnerability",
        detail: "The simultaneous 25% sales drop and 40% spike in complaints suggests that customers aren't just leaving for the competitor's lower prices; internal service/product degradation is actively pushing them away, making the competitor's aggressive pricing highly effective.",
        confidence_score: 0.92
      },
      {
        title: "Lagging Indicator Alignment",
        detail: "The competitor launched pricing changes 'last month', resulting in an immediate 25% sales drop in April. This indicates the Lahore market is highly price-elastic and lacks strong brand loyalty or switching costs.",
        confidence_score: 0.88
      },
      {
        title: "Service Recovery Window Closing",
        detail: "A 40% complaint spike without immediate resolution usually precedes a secondary wave of churn. If the root cause of these complaints isn't addressed, May sales will likely see an exponential, rather than linear, decline.",
        confidence_score: 0.85
      }
    ]
  },
  impact: {
    impact_analyses: [
      {
        insight_title: "Compounded Defection Vulnerability",
        business_consequence: "Permanent loss of regional market share and damaged brand reputation in Lahore.",
        urgency_level: "High",
        estimated_loss_or_gain: "-$150k to -$300k monthly (depending on base revenue) if unmitigated",
        time_sensitivity: "Immediate (Next 7-14 days)"
      },
      {
        insight_title: "Lagging Indicator Alignment",
        business_consequence: "Competitor establishes a price monopoly, forcing a race-to-the-bottom margin compression.",
        urgency_level: "High",
        estimated_loss_or_gain: "-15% contraction in regional profit margins",
        time_sensitivity: "Within 30 days"
      },
      {
        insight_title: "Service Recovery Window Closing",
        business_consequence: "Secondary churn wave resulting in catastrophic loss of annual recurring revenue (ARR).",
        urgency_level: "Medium",
        estimated_loss_or_gain: "Unknown compounding lifetime value (LTV) loss",
        time_sensitivity: "Next 14-21 days"
      }
    ],
    cross_cutting_themes: [
      "Pricing Elasticity",
      "Operational Quality Control",
      "Customer Retention"
    ]
  },
  actions: {
    recommendations: [
      {
        title: "Deploy 'Save Team' & Service Audit",
        priority: 1,
        budget_estimate: "$5,000 (Overtime & appeasement credits)",
        deadline: "Within 48 hours",
        responsible_team: "Customer Success & QA",
        expected_outcome: "Resolve top 50% of outstanding complaints and identify root cause of the 40% spike to halt secondary churn."
      },
      {
        title: "Targeted Loyalty Counter-Offer",
        priority: 2,
        budget_estimate: "$25,000 (Margin sacrifice)",
        deadline: "End of week",
        responsible_team: "Sales & Regional Marketing",
        expected_outcome: "Deploy a localized, limited-time bundle or loyalty discount specifically to the Lahore region to neutralize the competitor's aggressive pricing without permanently lowering list prices."
      },
      {
        title: "Competitor Teardown Analysis",
        priority: 3,
        budget_estimate: "None (Internal resource)",
        deadline: "Within 14 days",
        responsible_team: "Product & Strategy",
        expected_outcome: "Detailed understanding of competitor's new pricing matrix and unit economics to adjust long-term regional strategy."
      }
    ]
  },
  simulation: {
    simulations: [
      {
        action_title: "Deploy 'Save Team' & Service Audit",
        simulated_service: "Zendesk & Salesforce API",
        status: "Success",
        mock_response: "{\"status\": 200, \"tickets_escalated\": 142, \"automated_appeasement_emails_sent\": 350, \"workflow_triggered\": \"high_churn_risk_lahore\"}",
        timestamp: "2026-05-19T20:41:15Z"
      }
    ],
    outcomes: [
      {
        metric: "Customer Complaint Backlog",
        before_value: "40% above baseline",
        after_value: "10% above baseline",
        change_pct: "-75%",
        explanation: "Dedicated 'Save Team' successfully cleared the backlog and issued service credits to highly agitated accounts."
      },
      {
        metric: "Projected May Sales Drop",
        before_value: "-35% (Extrapolated)",
        after_value: "-15%",
        change_pct: "+20%",
        explanation: "Service recovery efforts intercepted churn-bound customers, recovering a significant portion of at-risk revenue despite competitor pricing."
      }
    ]
  }
};

export const SCENARIO_B_DATA = {
  extraction: {
    key_facts: [
      "Macro fuel prices have surged by 18%.",
      "Overall logistics and transportation costs are escalating.",
      "Systemic delivery delays are actively occurring across the Punjab region."
    ],
    data_points: [
      "Fuel price increase: +18%"
    ],
    signals: [
      "Supply chain fragility under sudden macroeconomic stress.",
      "Potential capacity constraints or vendor pushback causing the regional delays.",
      "Imminent margin compression on landed goods."
    ],
    source_type: "Supply Chain & Operations Alert"
  },
  insights: {
    insights: [
      {
        title: "Vendor Rate Renegotiation Standoff",
        detail: "The correlation between the 18% fuel spike and immediate delivery delays in Punjab suggests transport partners are intentionally slowing down operations or halting dispatch to force rate renegotiations, prioritizing survival over SLAs.",
        confidence_score: 0.89
      },
      {
        title: "Margin Erosion on Delivered Goods",
        detail: "Products with tight margins and inclusive shipping costs are instantly becoming unprofitable. The rising logistics costs will outpace current pricing models if the 18% fuel spike sustains.",
        confidence_score: 0.95
      },
      {
        title: "SLA Breach & Customer Trust Attrition",
        detail: "Unchecked delays across a major region (Punjab) will trigger a surge in customer support tickets, refund requests, and negative reviews, turning an operational cost issue into a customer retention crisis.",
        confidence_score: 0.82
      }
    ]
  },
  impact: {
    impact_analyses: [
      {
        insight_title: "Vendor Rate Renegotiation Standoff",
        business_consequence: "Complete supply chain gridlock in the Punjab region, halting revenue realization.",
        urgency_level: "High",
        estimated_loss_or_gain: "-$50k daily in unfulfilled orders",
        time_sensitivity: "Immediate (Next 24-48 hours)"
      },
      {
        insight_title: "Margin Erosion on Delivered Goods",
        business_consequence: "Net losses on heavy/bulky items being shipped under old pricing structures.",
        urgency_level: "Medium",
        estimated_loss_or_gain: "-8% to -12% contraction in gross margins",
        time_sensitivity: "Within 7 days"
      },
      {
        insight_title: "SLA Breach & Customer Trust Attrition",
        business_consequence: "Spike in refund processing costs and permanent damage to regional brand equity.",
        urgency_level: "High",
        estimated_loss_or_gain: "-$15k weekly in SLA penalty refunds",
        time_sensitivity: "Immediate"
      }
    ],
    cross_cutting_themes: [
      "Supply Chain Resilience",
      "Macroeconomic Vulnerability",
      "Customer Expectation Management"
    ]
  },
  actions: {
    recommendations: [
      {
        title: "Proactive Punjab Delay Notification",
        priority: 1,
        budget_estimate: "$0 (Internal CRM)",
        deadline: "Within 12 hours",
        responsible_team: "Customer Support & CRM",
        expected_outcome: "Send mass email/SMS to all affected customers in Punjab offering proactive apologies and revised ETAs, reducing inbound support volume by 60%."
      },
      {
        title: "Authorize Emergency Vendor Fuel Surcharge",
        priority: 2,
        budget_estimate: "$12,000 (Short-term OPEX increase)",
        deadline: "Within 24 hours",
        responsible_team: "Logistics & Procurement",
        expected_outcome: "Temporarily approve a 5-8% fuel surcharge for regional 3PL partners to immediately unblock halted shipments and clear the Punjab backlog."
      },
      {
        title: "Implement Dynamic Shipping Rates",
        priority: 3,
        budget_estimate: "$2,500 (Dev hours)",
        deadline: "End of week",
        responsible_team: "E-commerce & Tech",
        expected_outcome: "Update the checkout engine to dynamically reflect increased fuel costs in shipping fees for new orders, protecting product margins."
      }
    ]
  },
  simulation: {
    simulations: [
      {
        action_title: "Proactive Punjab Delay Notification",
        simulated_service: "Twilio & SendGrid",
        status: "Success",
        mock_response: "{\"status\": 200, \"sms_delivered\": 4102, \"emails_delivered\": 4088, \"bounce_rate\": \"0.4%\"}",
        timestamp: "2026-05-19T20:50:22Z"
      },
      {
        action_title: "Authorize Emergency Vendor Fuel Surcharge",
        simulated_service: "ERP Vendor Management API",
        status": "Success",
        mock_response: "{\"status\": 200, \"contracts_updated\": 14, \"dispatch_status\": \"resumed\", \"backlog_clearance_est\": \"48h\"}",
        timestamp: "2026-05-19T20:50:25Z"
      }
    ],
    outcomes: [
      {
        metric: "Inbound Support Ticket Volume",
        before_value: "+300% (Surge)",
        after_value: "+40% (Manageable)",
        change_pct: "-86%",
        explanation: "Proactive communication reset customer expectations, drastically reducing 'Where is my order?' queries."
      },
      {
        metric: "Punjab Delivery Dispatch Rate",
        before_value: "12% of baseline",
        after_value: "95% of baseline",
        change_pct: "+691%",
        explanation: "Approving the emergency fuel surcharge successfully incentivized vendor fleets to resume normal operational volume."
      }
    ]
  }
};

export const SCENARIO_C_DATA = {
  extraction: {
    key_facts: [
      "Electronics demand in Karachi has surged post-Eid.",
      "Current local inventory levels are sitting at 60%.",
      "A primary competitor is entirely out of stock in this category."
    ],
    data_points: [
      "Demand increase: +35%",
      "Inventory capacity: 60%"
    ],
    signals: [
      "Temporary market monopoly due to competitor absence.",
      "High risk of impending stock-out given the +35% demand trajectory against 60% stock.",
      "Immediate pricing power opportunity."
    ],
    source_type: "Market Intelligence & Inventory Report"
  },
  insights: {
    insights: [
      {
        title: "Temporary Monopoly Squeeze",
        detail: "The competitor's stock-out has effectively handed us a temporary monopoly in Karachi. However, with demand artificially inflated by 35%, our 60% inventory will deplete exponentially faster than historical run-rates predict.",
        confidence_score: 0.96
      },
      {
        title: "Unleveraged Pricing Power",
        detail: "Customers currently have no alternative purchasing options in the immediate region. This presents a rare, high-leverage opportunity to increase margins without suffering competitive churn.",
        confidence_score: 0.92
      },
      {
        title: "Supply Chain Race Condition",
        detail: "The first player to fully restock will capture the trailing edge of the post-Eid demand curve. We are in a race against the competitor's replenishment cycle.",
        confidence_score: 0.85
      }
    ]
  },
  impact: {
    impact_analyses: [
      {
        insight_title: "Temporary Monopoly Squeeze",
        business_consequence: "Premature stock-out leading to thousands of dollars in missed sales.",
        urgency_level: "High",
        estimated_loss_or_gain: "+$80k to +$120k in achievable gross sales",
        time_sensitivity: "Immediate (Next 24-72 hours)"
      },
      {
        insight_title: "Unleveraged Pricing Power",
        business_consequence: "Leaving significant gross margin on the table by selling at standard market rates during a supply shortage.",
        urgency_level: "High",
        estimated_loss_or_gain: "+12% to +18% increase in gross profit margins",
        time_sensitivity: "Immediate"
      },
      {
        insight_title": "Supply Chain Race Condition",
        business_consequence: "Loss of market dominance once the competitor secures their inbound shipments.",
        urgency_level: "Medium",
        estimated_loss_or_gain: "Unknown downstream market share",
        time_sensitivity: "Next 7-14 days"
      }
    ],
    cross_cutting_themes: [
      "Dynamic Pricing Strategy",
      "Inventory Velocity Optimization",
      "Market Share Capture"
    ]
  },
  actions: {
    recommendations: [
      {
        title: "Activate Dynamic Pricing Surge",
        priority: 1,
        budget_estimate: "$0 (Internal system)",
        deadline: "Within 2 hours",
        responsible_team: "Pricing & E-commerce",
        expected_outcome: "Increase retail prices on high-demand electronics by 8-12% in the Karachi region to maximize margins and slightly cool demand velocity, preventing a total stock-out."
      },
      {
        title: "Emergency Cross-Regional Restock",
        priority: 2,
        budget_estimate: "$3,500 (Expedited freight)",
        deadline: "Within 48 hours",
        responsible_team: "Logistics & Supply Chain",
        expected_outcome: "Transfer 25% of stagnant electronics inventory from the Lahore/Islamabad hubs directly to Karachi to sustain the sales run-rate."
      },
      {
        title: "Targeted 'In-Stock' Marketing Blitz",
        priority: 3,
        budget_estimate: "$2,000 (Ad spend)",
        deadline: "Within 12 hours",
        responsible_team: "Performance Marketing",
        expected_outcome: "Deploy geo-targeted digital ads in Karachi explicitly highlighting 'In Stock & Ready to Ship Today', capturing the competitor's stranded customer base."
      }
    ]
  },
  simulation: {
    simulations: [
      {
        action_title: "Activate Dynamic Pricing Surge",
        simulated_service: "Shopify / Internal Pricing API",
        status: "Success",
        mock_response: "{\"status\": 200, \"skus_updated\": 142, \"avg_price_increase\": \"10.5%\", \"region_lock\": \"Karachi\"}",
        timestamp: "2026-05-19T20:58:14Z"
      },
      {
        action_title: "Emergency Cross-Regional Restock",
        simulated_service: "SAP / ERP Inventory Module",
        status": "Success",
        mock_response: "{\"status\": 200, \"transfer_order_created\": \"TO-88912\", \"units_in_transit\": 1200, \"eta\": \"36 hours\"}",
        timestamp: "2026-05-19T20:58:17Z"
      }
    ],
    outcomes: [
      {
        metric: "Gross Profit Margin (Karachi)",
        before_value: "22%",
        after_value: "31%",
        change_pct: "+40%",
        explanation: "Dynamic pricing successfully captured the consumer surplus generated by the competitor's absence."
      },
      {
        metric: "Projected Stock-Out Timeline",
        before_value: "4.5 Days",
        after_value: "12 Days",
        change_pct: "+166%",
        explanation: "The combination of cooled velocity (via higher prices) and expedited regional inbound freight successfully stabilized the local supply chain."
      }
    ]
  }
};
