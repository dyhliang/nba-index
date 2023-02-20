import React, { useEffect, useState } from 'react';
import Header from './Header';
import { apikey } from './apikey';

let randomNum = (Math.floor(Math.random() * (9000 - 1 + 1)) + 1).toString();

function RewindPage() {
    const [rndGameStats, setRndGameStats] = useState([]);
    const [moreStats, setMoreStats] = useState([]);
    const [moreInfo, setMoreInfo] = useState([]);

    const options = apikey();

    const getRndGame = () => {
        let new_url = `https://api-nba-v1.p.rapidapi.com/games?id=${randomNum}`

        fetch(new_url, options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setRndGameStats(res.response);
                setMoreInfo(res.response);
            })
            .catch(err => console.error(err));
    };

    const getMoreStats = () => {
        let game_url = `'https://api-nba-v1.p.rapidapi.com/games/statistics?id=${randomNum}`

        fetch(game_url, options)
            .then(res => res.json())
            .then(res => {
                console.log(res.response);
                setMoreStats(res.response);
            })
            .catch(err => console.error(err));
    }

    function refreshPage() {
        window.location.reload(false);
    };

    useEffect(() => {
        getRndGame();
        getMoreStats();
    }, []);

    return (
        <div className="App">
            <Header></Header>
            <br></br>
            {rndGameStats.map((output) =>
                <rewind>
                    <h4>{output.date.start.slice(0, 10)} @ {output.arena.name} in {output.arena.city}, {output.arena.state}</h4>
                    <h4> {output.nugget} </h4>
                </rewind>)}
            <br></br>

            {moreInfo.map(output =>
                <div>
                    <rewind>
                        <table>
                            <thead>
                                <tr>
                                    <th> Teams | Quarters &nbsp; &nbsp; </th>
                                    <th> 1 </th>
                                    <th> 2 </th>
                                    <th> 3 </th>
                                    <th> 4 </th>
                                    <th> OT </th>
                                    <th> F </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{output.teams.home.name} ({output.scores.home.win}-{output.scores.home.loss}) &nbsp; &nbsp; </td>
                                    <td>{output.scores.home.linescore[0]}</td>
                                    <td>{output.scores.home.linescore[1]}</td>
                                    <td>{output.scores.home.linescore[2]}</td>
                                    <td>{output.scores.home.linescore[3]}</td>
                                    <td>{output.scores.home.linescore[4]}</td>
                                    <td><highlighter>{output.scores.home.points}</highlighter></td>
                                </tr>
                                <tr>
                                    <td>{output.teams.visitors.name} ({output.scores.visitors.win}-{output.scores.visitors.loss}) </td>
                                    <td>{output.scores.visitors.linescore[0]}</td>
                                    <td>{output.scores.visitors.linescore[1]}</td>
                                    <td>{output.scores.visitors.linescore[2]}</td>
                                    <td>{output.scores.visitors.linescore[3]}</td>
                                    <td>{output.scores.visitors.linescore[4]}</td>
                                    <td><highlighter>{output.scores.visitors.points}</highlighter></td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br>
                        <table>
                            <tr>Lead Changes: {output.leadChanges} &nbsp; &nbsp;
                                Times Tied: {output.timesTied}</tr>
                        </table>
                    </rewind>
                </div>
            )}

            <br></br>
            <br></br>
            <button onClick={refreshPage}> Rewind Again </button>

        </div>
    );

};

export default RewindPage;