import BaseService from "./base-service";
import IMood from "./interfaces/IMood";
import MoodUpdate from "./models/MoodUpdate";

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
            { icon: "emoticon-outline", text: "Happy", color: "lightgreen" },
            { icon: "emoticon-neutral-outline", text: "Neutral", color: "yellow" },
            { icon: "emoticon-sad-outline", text: "Sad", color: "orange" },
            { icon: "emoticon-cry-outline", text: "Very Sad", color: "darkorange" },
            { icon: "emoticon-angry-outline", text: "Angry", color: "red" },
            { icon: "emoticon-confused-outline", text: "Ashamed", color: "purple" },
            { icon: "emoticon-frown-outline", text: "Anxious", color: "brown" },
        ];
    }

    async getTodayMoodTrackingStateAsync() {
        return Promise.resolve(false);
    }
}

export const MoodTrackingApi = new MoodTrackingService();