import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slide from "./Slide";
import SlideIndicator from "./SlideIndicator";
import { setOnboarding } from "../../redux/actions/connectActions";

const TOTAL_SLIDES = 3;

const OnboardingSlides = () => {
    const [activeSlide, setActiveSlide] = useState(1);

    const self = useSelector(state => state.user.user.username);
    const dispatch = useDispatch();

    const setSlideState = id => {
        if (id === activeSlide)
            return "active";
        return "inactive";
    }

    const nextSlide = () => {
        let id = activeSlide;
        id < TOTAL_SLIDES ? setActiveSlide(id + 1) : dispatch(setOnboarding(self, true));
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
                <h3>Feel bored? Find online players to play with the minesweeper game.</h3>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding1.png"}
                        className="img-fluid my-4 float-right fit" alt="Find online players to play with the minesweeper game." />
                </div>
            </Slide>
            <Slide slideStatus={setSlideState(2)} slideId={2}>
                <h3>Send invitation to your interested parterners.</h3>
                <p>If the other player is unfortunately offline when requesting, you would be declined automatically.</p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding2.png"}
                         className="img-fluid"
                         alt="Click on the Send Invitation button would request game with the player." />
                </div>
            </Slide>
            <Slide slideStatus={setSlideState(3)} slideId={3}>
                <h3>Minesweeper Expert? Two-player game now.</h3>
                <p>Block: show the number of mines adjacent to the block</p>
                <p>Flag: Put a flag in a zone when you have confirmed that there is a mine.</p>
                <p>**Important: this time you can unflag your parterner's if you have a more cautious conclusion.</p>
                <div className="fit my-4">
                    <img src={process.env.PUBLIC_URL + "/onboarding3.png"}
                         className="img-fluid"
                         alt="The job openings saved by more people would be ranked higher in the result." />
                </div>
            </Slide>
            <div className="slides-controls">
                <button className="align-left control-btn" onClick={() => dispatch(setOnboarding(self, true))}>Skip</button>
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