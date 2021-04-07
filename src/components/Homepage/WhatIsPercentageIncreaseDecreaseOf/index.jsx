import React, { useRef, useReducer } from 'react';
import PropTypes from 'prop-types';
import { getValueOfRef, precisionRound } from '../../../core/utils';
import Icons from '../../common/Icons';

const WhatIsPercentageIncreaseDecreaseOf = ({ direction }) => {
    const [state, setState] = useReducer((currentState, newState) => ({ ...currentState, ...newState }), {
        result: 0,
        isCopied: false,
        isInput1Filled: false,
        isInput2Filled: false,
    });
    const { result, isCopied, isInput1Filled, isInput2Filled } = state;

    const refInput1 = useRef(null);
    const refInput2 = useRef(null);

    const inputChangeHandler = () => {
        const number1 = getValueOfRef(refInput1);
        const number2 = getValueOfRef(refInput2);

        let calculateResult = 0;
        if (number1 !== 0 && number2 !== 0) {
            if (direction === 'increase') {
                calculateResult = precisionRound((number2 / 100) * number1 + number2);
            } else {
                calculateResult = precisionRound(number2 - (number2 / 100) * number1);
            }
        }

        setState({
            isInput1Filled: number1 !== 0,
            isInput2Filled: number2 !== 0,
            result: calculateResult,
        });
    };

    const copyResultClickHandler = () => {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(String(result)).then(() => {
                setState({ isCopied: true });
                setTimeout(() => {
                    setState({ isCopied: false });
                }, 1000);
            });
        }
    };

    const clearInputField = ref => {
        if (!ref || !ref.current) return;
        ref.current.value = '';
        ref.current.focus();
        inputChangeHandler();
    };

    return (
        <div className="white-box">
            <div className="mb-3">
                Calculate percentage <span className="text-bold">{direction}</span> of a number.
            </div>
            <div className="row align-items-center mb-3">
                <div className="col pr-2dot5">
                    <div className="position-relative">
                        <input
                            tabIndex={1}
                            type="number"
                            placeholder="--"
                            onChange={inputChangeHandler}
                            ref={refInput1}
                        />
                        {isInput1Filled && (
                            <button
                                type="button"
                                className="btn-clear-input"
                                onClick={() => clearInputField(refInput1)}
                            >
                                <Icons name="x" />
                            </button>
                        )}
                    </div>
                </div>
                <div className="col p-0 col-auto">
                    %
                    {direction === 'increase' ? (
                        <Icons name="trending-up" customClass="text-green mx-2" />
                    ) : (
                        <Icons name="trending-down" customClass="text-red mx-2" />
                    )}
                    of
                </div>
                <div className="col pl-2dot5">
                    <div className="position-relative">
                        <input
                            tabIndex={1}
                            type="number"
                            placeholder="--"
                            onChange={inputChangeHandler}
                            ref={refInput2}
                        />
                        {isInput2Filled && (
                            <button
                                type="button"
                                className="btn-clear-input"
                                onClick={() => clearInputField(refInput2)}
                            >
                                <Icons name="x" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {result !== 0 && (
                <div className="result-box mb-3">
                    <div className="row align-items-center">
                        <div className="col">
                            Result: <span className="text-large ml-3">{result.toLocaleString()}</span>
                        </div>
                        <div className="col col-auto">
                            <button
                                disabled={isCopied}
                                type="button"
                                className="btn-copy btn circle"
                                onClick={copyResultClickHandler}
                            >
                                {isCopied ? <Icons name="check" /> : <Icons name="copy" />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

WhatIsPercentageIncreaseDecreaseOf.propTypes = {
    direction: PropTypes.string,
};

WhatIsPercentageIncreaseDecreaseOf.defaultProps = {
    direction: 'increase',
};

export default WhatIsPercentageIncreaseDecreaseOf;
