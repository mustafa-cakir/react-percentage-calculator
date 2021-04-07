import React, { useRef, useReducer } from 'react';
import { parseFloatIfNumber, precisionRound } from '../../../core/utils';
import Icons from '../../common/Icons';

const PercentageIncreaseDecrease = () => {
    const [state, setState] = useReducer((currentState, newState) => ({ ...currentState, ...newState }), {
        result: 0,
        isCopied: false,
        isInput1Filled: false,
        isInput2Filled: false,
    });
    const { result, isCopied, isInput1Filled, isInput2Filled } = state;

    const refInput1 = useRef(null);
    const refInput2 = useRef(null);

    const getValueOfRef = ref => {
        if (!ref || !ref.current || !ref.current.value) return 0;
        return parseFloatIfNumber(ref.current.value);
    };

    const inputChangeHandler = () => {
        const number1 = getValueOfRef(refInput1);
        const number2 = getValueOfRef(refInput2);

        let calculateResult = 0;
        if (number1 !== 0 && number2 !== 0) {
            calculateResult = precisionRound(((number2 - number1) / number1) * 100, 2);
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
            <div className="mb-3">Calculage percentage increase or decrease.</div>
            <div className="row align-items-center mb-3">
                <div className="col pr-0 col-auto">from</div>
                <div className="col px-2dot5">
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
                <div className="col p-0 col-auto">to</div>
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
                            Result:
                            {result > 0 ? (
                                <Icons name="trending-up" customClass="text-green ml-3 mr-2" />
                            ) : (
                                <Icons name="trending-down" customClass="text-red ml-3 mr-2" />
                            )}
                            <span className="text-large mr-1">{result.toLocaleString()}</span> %
                        </div>
                        <div className="col col-auto">
                            <button
                                disabled={isCopied}
                                type="button"
                                className="btn circle"
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

export default PercentageIncreaseDecrease;
