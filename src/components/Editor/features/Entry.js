import React from 'react'

export default function Entry(props) {
    const {
        mention,
        theme,
        searchValue,
        isFocused,
        ...parentProps
    } = props;


    return (
        <div {...parentProps}>
            <div className={theme?.mentionSuggestionsEntryContainer}>
                <div className={theme?.mentionSuggestionsEntryContainerLeft}>
                    <img
                        src={mention.user_avatar}
                        className={theme?.mentionSuggestionsEntryAvatar}
                        role="presentation"
                    />
                </div>

                <div className={theme?.mentionSuggestionsEntryContainerRight}>
                    <div className={theme?.mentionSuggestionsEntryText}>
                        {mention.user_name}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <div className={theme?.mentionSuggestionsEntryTitle}>
                            {mention.user_email}
                        </div>

                        <div className={theme?.mentionSuggestionsEntryTitle02}>
                            {mention.isFriend ? "Friend" : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
