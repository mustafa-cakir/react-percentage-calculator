import React, { useRef, useReducer } from 'react';
import { getValueOfRef, precisionRound } from '../../../core/utils';
import Icons from '../../common/Icons';

const PercentageUpsAndDowns = () => {
    const [state, setState] = useReducer((currentState, newState) => ({ ...currentState, ...newState }), {
        result: null,
        isCopied: false,
        copiedValue: 0,
        isInput1Filled: false,
    });
    const { result, isCopied, copiedValue, isInput1Filled } = state;

    const refInput1 = useRef(null);

    const inputChangeHandler = () => {
        const number1 = getValueOfRef(refInput1);

        let calculateResult = null;
        if (number1 !== 0) {
            calculateResult = [
                {
                    id: 1,
                    percentage: 2,
                    isUp: true,
                    value: precisionRound((102 / 100) * number1),
                },
                {
                    id: 2,
                    percentage: 3,
                    isUp: true,
                    value: precisionRound((103 / 100) * number1),
                },
                {
                    id: 11,
                    percentage: 4,
                    isUp: true,
                    value: precisionRound((104 / 100) * number1),
                },
                {
                    id: 3,
                    percentage: 5,
                    isUp: true,
                    value: precisionRound((105 / 100) * number1),
                },
                {
                    id: 4,
                    percentage: 10,
                    isUp: true,
                    value: precisionRound((110 / 100) * number1),
                },
                {
                    id: 5,
                    percentage: 20,
                    isUp: true,
                    value: precisionRound((120 / 100) * number1),
                },
                {
                    id: 6,
                    percentage: 2,
                    isUp: false,
                    value: precisionRound((98 / 100) * number1),
                },
                {
                    id: 7,
                    percentage: 3,
                    isUp: false,
                    value: precisionRound((97 / 100) * number1),
                },
                {
                    id: 12,
                    percentage: 4,
                    isUp: false,
                    value: precisionRound((96 / 100) * number1),
                },
                {
                    id: 8,
                    percentage: 5,
                    isUp: false,
                    value: precisionRound((95 / 100) * number1),
                },
                {
                    id: 9,
                    percentage: 10,
                    isUp: false,
                    value: precisionRound((90 / 100) * number1),
                },
                {
                    id: 10,
                    percentage: 20,
                    isUp: false,
                    value: precisionRound((80 / 100) * number1),
                },
            ];
        }

        setState({
            isInput1Filled: number1 !== 0,
            result: calculateResult,
        });
    };

    const copyValueClickHandler = value => {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(String(value)).then(() => {
                setState({ isCopied: true, copiedValue: value });
                setTimeout(() => {
                    setState({ isCopied: false, copiedValue: 0 });
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
            <div className="mb-3">Calculate percentage of ups and downs.</div>
            <div className="row align-items-center mb-3">
                <div className="col pr-0 col-auto">entry price</div>
                <div className="col pl-2dot5">
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
            </div>
            {result && (
                <div className="result-box d-block">
                    {result &&
                        result.map(item => {
                            const { id, percentage, isUp, value } = item;
                            return (
                                <div key={id} className="position-relative">
                                    <div className="row align-items-center">
                                        <div className="col text-right">
                                            <span className={isUp ? 'text-green' : 'text-red'}>
                                                {percentage}% {isUp ? 'UP' : 'DOWN'}
                                            </span>
                                        </div>
                                        <div className="col text-left p-0">
                                            <span className="text-large">{value}</span>
                                        </div>
                                        <div className="col col-auto">
                                            <button
                                                disabled={isCopied && copiedValue === value}
                                                type="button"
                                                className="btn small circle"
                                                onClick={() => copyValueClickHandler(value)}
                                            >
                                                {isCopied && copiedValue === value ? (
                                                    <Icons name="check" />
                                                ) : (
                                                    <Icons name="copy" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default PercentageUpsAndDowns;
