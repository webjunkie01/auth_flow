import React from 'react';
import PropTypes from 'prop-types';

const Messages  = (props) => {
    const {messages} = props
    return (
        <div>
            <ul>
                <li key={messages.time}>{messages.body}</li>
            </ul>
        </div>
        )
}

Messages.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            body: PropTypes.string,
            time: PropTypes.date

        })
    )
}

export default Messages

