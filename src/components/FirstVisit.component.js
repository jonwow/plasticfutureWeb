import React from "react";


const FirstVisit =  () => {
    return <div id="first-time-container" onClick={() => {
        localStorage.setItem("firstVisit", "false");
        window.location.replace("/")
    }}>
        <span>
            <p class="first-time-welcome-text">ENTER</p>
            <p class="first-time-welcome-text">PLASTIC FUTURE</p>
        </span>

        <p class="first-time-tnc-gdpr-text">BY CLICKING ANY BUTTON YOU AGREE TO THE TERMS AND CONDITIONS AND THE PRIVACY&GDPR POLICY OF "PLASTIC FUTURE".</p>
    </div>
}

export default FirstVisit;