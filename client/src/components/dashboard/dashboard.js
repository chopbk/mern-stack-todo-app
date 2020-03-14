
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/auth.actions";

function Count() {
    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();

    return (
        <main>
            <div>Count: {count}</div>
            <button onClick={() => dispatch(logoutUser())}>Add to count</button>
        </main>
    );
};

export default Count;

