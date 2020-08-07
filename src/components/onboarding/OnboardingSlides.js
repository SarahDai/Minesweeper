import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Slide from "./Slide";
import SlideIndicator from "./SlideIndicator";
import { completeOnboarding } from "../../redux/actions";

const TOTAL_SLIDES = 3;

const OnboardingSlides = () => {
    const [activeSlide, setActiveSlide] = useState(1);

    const dispatch = useDispatch();

    const setSlideState = id => {
        if (id === activeSlide)
            return "active";
        return "inactive";
    }

    const nextSlide = () => {
        let id = activeSlide;
        id < TOTAL_SLIDES ? setActiveSlide(id + 1) : dispatch(completeOnboarding());
    }

    const generateSlideIndicators = () => {
        let indicators = [];
        for (let i = 1; i <= TOTAL_SLIDES; i++) {
            indicators.push(
                <SlideIndicator slideStatus={setSlideState(i)} key={i} 
                                slideID={i} 
                                clickHandler={() => setActiveSlide(i)} />
            )
        }
        return indicators;
    }

    return (
        <div className="slides-bg">
            <Slide slideStatus={setSlideState(1)} slideId={1}>
                <h2>Explore jobs near you</h2>
                <p>Start your job search based on all your interested programming languages at one time.</p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding1.png"}
                        className="img-fluid my-4 float-right fit" alt="Search jobs based on your interesting programming languages." />
                </div>
            </Slide>
            <Slide slideStatus={setSlideState(2)} slideId={2}>
                <h2>Keep track of what you're thinking of applying to.</h2>
                <p>Click on Save button to archive the job postings.
                </p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding2.png"}
                         className="img-fluid"
                         alt="Click on the Save button would save or delete the job postings." />
                </div>
            </Slide>
            <Slide slideStatus={setSlideState(3)} slideId={3}>
                <h2>Follow the hot jobs.</h2>
                <p>Browse the job openings by popularity. Hot jobs!</p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding3.png"}
                         className="img-fluid"
                         alt="The job openings saved by more people would be ranked higher in the result." />
                </div>
            </Slide>
            <div className="slides-controls">
                <button className="align-left control-btn" onClick={() => dispatch(completeOnboarding())}>Skip</button>
                <div className="align-center">
                    {generateSlideIndicators()}
                </div>
                <button className="align-right control-btn" onClick={nextSlide}>
                    {
                        activeSlide < TOTAL_SLIDES ? "Next" : "Done"
                    }
                </button>
            </div>
        </div>
    )
}

export default OnboardingSlides;