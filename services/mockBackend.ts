
// Fixed imports: MOCK_FACT_CHECKS is now exported, and REAL_TEAM is used instead of MOCK_TEAM
import { MOCK_VIOLATIONS, MOCK_NEWS, MOCK_REPORTS, MOCK_FACT_CHECKS, REAL_TEAM } from '../constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockBackend = {
  getViolations: async () => {
    await delay(800);
    return MOCK_VIOLATIONS;
  },
  getNews: async () => {
    await delay(600);
    return MOCK_NEWS;
  },
  getReports: async () => {
    await delay(700);
    return MOCK_REPORTS;
  },
  getFactChecks: async () => {
    await delay(500);
    return MOCK_FACT_CHECKS;
  },
  getTeam: async () => {
    await delay(400);
    // Fixed: REAL_TEAM is exported from constants, not MOCK_TEAM
    return REAL_TEAM;
  },
  sendEmergencyAlert: async (location: GeolocationPosition | null) => {
    await delay(1500);
    console.log('Emergency Alert Sent!', location);
    return { success: true };
  }
};
