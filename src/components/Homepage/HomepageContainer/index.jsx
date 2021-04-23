import React from 'react';
import WhatIsPercentageOf from '../WhatIsPercentageOf';
import logoForDay from '../../../assets/images/logo.svg';
import logoForNight from '../../../assets/images/logo-white.svg';
import IsWhatPercentageOf from '../IsWhatPercentageOf';
import PercentageIncreaseDecrease from '../PercentageIncreaseDecrease';
import PercentageUpsAndDowns from '../PercentageUpsAndDowns';
import './Style.scss';
import Icons from '../../common/Icons';
import WhatIsPercentageIncreaseDecreaseOf from '../WhatIsPercentageIncreaseDecreaseOf';
import DayNightSwitcher from '../../common/DayNightSwitcher';
import { useGlobalState } from '../../../StateContext';

const HomepageContainer = () => {
    const [state] = useGlobalState();
    const { isThemeDark } = state;

    return (
        <div className="homepage">
            <header>
                <div className="container">
                    <h1 className="d-flex align-items-center mb-2dot5">
                        <img
                            className="logo"
                            src={isThemeDark ? logoForNight : logoForDay}
                            alt="Easy Percentage Calculator"
                        />{' '}
                        Easy Percentage Calculator
                    </h1>
                    <p className="text-gray text-medium">
                        Easy Percentage Calculator is very handy while trading on crtypo and/or stock-markets. It lets
                        you calculate percentages of given numbers with ease.
                    </p>
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="my-6">
                        <PercentageUpsAndDowns />
                    </div>
                    <div className="my-6">
                        <PercentageIncreaseDecrease />
                    </div>
                    <div className="my-6">
                        <WhatIsPercentageIncreaseDecreaseOf direction="increase" />
                    </div>
                    <div className="my-6">
                        <WhatIsPercentageIncreaseDecreaseOf direction="decrease" />
                    </div>
                    <div className="my-6">
                        <WhatIsPercentageOf />
                    </div>
                    <div className="my-6">
                        <IsWhatPercentageOf />
                    </div>
                </div>
            </main>
            <footer className="py-6">
                <div className="container">
                    <div className="pb-3">
                        <DayNightSwitcher />
                    </div>
                    <div className="row align-items-center">
                        <div className="col">
                            <div className="text-small text-gray">
                                <div className="mr-3">© 2021 - Developed by Mustafa Cakir</div>
                            </div>
                        </div>
                        <div className="col col-auto text-right">
                            <a
                                rel="noreferrer noopener"
                                href="https://github.com/mustafa-cakir/react-percentage-calculator"
                                target="_blank"
                                className="link text-large mr-3"
                            >
                                <Icons name="github" />
                            </a>
                            <a
                                rel="noreferrer noopener"
                                href="https://www.linkedin.com/in/mustafackr/"
                                target="_blank"
                                className="link text-large"
                            >
                                <Icons name="linkedin" />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomepageContainer;
