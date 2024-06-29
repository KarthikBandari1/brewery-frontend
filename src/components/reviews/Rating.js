import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
const Rate = (props) => {
	const [rate, setRate] = useState(0);
    const {setRating} =props
	return (
		<div className="div1">
			{[...Array(5)].map((item, index) => {
				const givenRating = index + 1;
				return (
					<label>
						<input
                        className="inp-rad"
							type="radio"
							value={givenRating}
							onClick={() => {
								setRate(givenRating);
                                setRating(givenRating)
								alert(
									`Are you sure you want to give 
									${givenRating} stars ?`
								);
							}}
						/>
						<div className="div2">
							<FaStar
								color={
									givenRating < rate || givenRating === rate
										? "000"
										: "rgb(192,192,192)"
								}
							/>
						</div>
					</label>
				);
			})}
		</div>
	);
};

export default Rate;
