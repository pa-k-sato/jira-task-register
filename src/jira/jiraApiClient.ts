import 'dotenv/config';
import axios, { AxiosResponse } from "axios";

export class JiraApiClient {
    async get(path: string, params: any): Promise<AxiosResponse> {
        return await axios.get(
            `https://${process.env.JIRA_DOMAIN}${path}`,
            { auth: this.authData(), headers: this.commonHeader(), params: params }
        );
    }

    async post(path: string, data: any): Promise<AxiosResponse> {
        return await axios.post(
            `https://${process.env.JIRA_DOMAIN}${path}`,
            data,
            { auth: this.authData(), headers: this.commonHeader()}
        );
    }

    private authData(): any {
        return  {
            username: process.env.JIRA_API_USERNAME,
            password: process.env.JIRA_API_TOKEN
        };
    }

    private commonHeader(): any {
        return {
            "Content-Type": "application/json"
        };
    }
}