import { useNavigate } from "react-router";
import { Button } from "../stories/Button";

export function MainPage () {
    const navigate = useNavigate();
    
    return <div className="p-6">
        <p>Welcome to Edventy's Learning Platform (originally Spaced Learning)!</p>
        <Button onClick={() => navigate('/q')} label="Quizzes"/>
    </div>
}