import IMood from "./models/IMood";

class MoodTrackingService {
    async sendMoodsAsync(selectedMoods: string[]) {
        console.log("saving selected moods");
        return Promise.resolve(true);
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
            { icon: "emoticon-frown-outline", text: "Anxious", color: "darkgray" },
        ];
    }

    async getTodayMoodTrackingStateAsync() {
        return Promise.resolve(false);
    }
}

export const MoodTrackingApi = new MoodTrackingService();