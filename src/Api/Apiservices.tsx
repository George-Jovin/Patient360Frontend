import axios from "axios";

const baseURL = "https://m43vpdvj-8000.inc1.devtunnels.ms";

class ApiService {
  instance;
  constructor() {
    this.instance = axios.create({
      baseURL: `${baseURL}`,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
  fetchAllData = async () => {
    try {
      const res = await this.instance.get("/api/fetch_all_records");
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  fetchPatientData = async (patientid: number) => {
    try {
      const res = await this.instance.get("api/fetch_patient_details", {
        params: {
          patientid: patientid,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  acceptData = async (patientid: number, type: string) => {
    try {
      const res = await this.instance.post(
        `api/send_plan_via_whatsapp?patientid=${patientid}&type=${type}`
      );
      return res;
    } catch (error) {
      throw error;
    }
  };
  
  
}

export default ApiService;
