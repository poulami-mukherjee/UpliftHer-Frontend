import moment from "moment";
import BaseService from "./base-service";
import IMood from "./interfaces/IMood";
import MoodUpdate from "./models/MoodUpdate";
import { IMoodEntry } from "./interfaces/IMoodEntry";

class MoodTrackingService extends BaseService {
    async sendMoodsAsync(selectedMoods: string[], notes: string) {
        var model = new MoodUpdate();
        model.moodSelection = selectedMoods;
        model.notes = notes;
        console.log("saving selected moods");
        return await this.post("mood-entries", model);
    }

    getMoods(): IMood[] {
        return [
            { icon: "emoticon-excited-outline", text: "Excited", color: "green" },
            { icon: "emoticon-outline", text: "Happy", color: "rgb(32, 161, 32)" },
            { icon: "emoticon-neutral-outline", text: "Neutral", color: "yellow" },
            { icon: "emoticon-sad-outline", text: "Sad", color: "orange" },
            { icon: "emoticon-cry-outline", text: "Very Sad", color: "darkorange" },
            { icon: "emoticon-confused-outline", text: "Ashamed", color: "#f52d2d" },
            { icon: "emoticon-angry-outline", text: "Angry", color: "red" },
            { icon: "emoticon-frown-outline", text: "Anxious", color: "darkred" },
        ];
    }

    async getMoodEntriesForIntervalAsync(fromDate: Date, toDate: Date) {
        const fromDateStr = moment(fromDate).format("YYYY-MM-DD");
        const toDateStr = moment(toDate).format("YYYY-MM-DD");
        const result = await this.get<IMoodEntry[]>(`moodEntries/insights?startDate=${fromDateStr}&endDate=${toDateStr}`);
        return result?.data ?? [];
    }

    async getTodayMoodTrackingStateAsync(): Promise<boolean> {
        const today = new Date();
        // Return false if no mood entered today
        try {
            return (await this.getMoodEntriesForIntervalAsync(today, today))?.length > 0 ?? false;
        }
        catch {
            return false;
        }
    }

    getMockData(from: Date, to: Date) {
        const mock: IMoodEntry[] = [
            { date: "2023-10-02", moodSelection: ["Happy"] },
            { date: "2023-10-04", moodSelection: ["Anxious", "Sad"] },
            { date: "2023-10-06", moodSelection: ["Anxious"] },
            { date: "2023-10-07", moodSelection: ["Happy", "Angry"] },
            { date: "2023-10-08", moodSelection: ["Very happy"] },
            { date: "2023-10-10", moodSelection: ["Very sad", "Anxious"] },
            { date: "2023-10-21", moodSelection: ["Neutral"] },
            { date: "2023-10-22", moodSelection: ["Anxious"] },
        ].filter(obj => {
            const objDate = new Date(obj.date);
            return objDate >= from && objDate <= to;
        });

        return mock;
    }
}

export const MoodTrackingApi = new MoodTrackingService();