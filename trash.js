<div>
    <div id="app">
        <h1 id="name-message">{`You are logged in as ${randomName}`}</h1>
        <div id="form">
            <label>Conference alias :</label>
            <input id="alias-input" value={aliasName} onChange={handleAliasChange} />
            <button id="join-btn" onClick={handleJoin}>Join</button>
            <button id="leave-btn" onClick={handleLeave}>Leave</button>
            <button id="record-btn" onClick={handleRecord}>Record</button>
            <button id="record-stop-btn" onClick={handleStop}>Stop</button>
            <button id="record-stop-btn" onClick={handleAudioStart}>Start Audio</button>
            <button id="record-stop-btn" onClick={handleAudioStop}>Stop Audio</button>
            <button id="record-stop-btn" onClick={getParts}>Get Participants</button>
            <audio id="main" controls></audio>
        </div>
    </div>
</div>