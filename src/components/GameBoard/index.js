import React, { useEffect, useState } from 'react';
import './style.css'
import Snake from '../Snake'
import Food from '../Food'

let interval;

function GameBoard() {
    const [snakeDots, setSnakedot] = useState([[0, 0], [2, 0], [4, 0], [6, 0], [8, 0]]);
    const [food, setFood] = useState(getRandomCoordinates());
    const [scores, setScores] = useState(0);
    const [direction, setDirection] = useState('right');

    useEffect(() => {
        interval = setInterval(moveTheSnake, 80);
        document.onkeydown = onStart;
        return () => {
            clearInterval(interval)
        }
    })

    useEffect(() => {
        checkIfBorder();
        checkIfCollapsed();
        checkIfFoodEaten()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scores, snakeDots, food, direction])

    function getRandomCoordinates() {
        let min = 1;
        let max = 98;
        let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
        let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
        return [x, y];
    }

    function moveTheSnake() {
        let dots = [...snakeDots];
        let head = snakeDots[snakeDots.length - 1];

        // console.log(head);

        switch (direction) {
            case 'right':
                head = [head[0] + 2, head[1]];
                break;
            case 'left':
                head = [head[0] - 2, head[1]];
                break;
            case 'up':
                head = [head[0], head[1] - 2];
                break;
            case 'down':
                head = [head[0], head[1] + 2];
                break;
            default:
        }
        dots.push(head);
        dots.shift();
        setSnakedot(dots);
    }

    function onStart(e) {
        e = e || window.event;
        // console.log(e.keyCode);
        switch (e.keyCode) {
            case 37:
                setDirection('left');
                break;
            case 38:
                setDirection('up');
                break;
            case 39:
                setDirection('right');
                break;
            case 40:
                setDirection('down');
                break;
            default:
        }
    }

    function checkIfCollapsed() {
        let snake = [...snakeDots];
        let head = snakeDots[snakeDots.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                gameOver();
            }
        })
    }

    function checkIfBorder() {
        let head = snakeDots[snakeDots.length - 1]
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            gameOver();
        }
    }

    function checkIfFoodEaten() {
        let snake = [...snakeDots]
        let head = snake[snake.length - 1];
        if (head[0] === food[0] && head[1] === food[1]) {
            // console.log('food', food);
            setFood(getRandomCoordinates())
            sizeUpSnake();
        }
    }

    function sizeUpSnake() {
        let newSnake = [...snakeDots];
        newSnake.unshift([]);
        setSnakedot(newSnake);
        setScores(scores + 1)
    }

    function gameOver() {
        alert('Game Over')
        setSnakedot([[0, 0], [2, 0], [4, 0], [6, 0], [8, 0]]);
        setDirection('right');
        setFood(getRandomCoordinates());
        setScores(0);
    }

    return (
        <div className='game-container'>
            <div className='score'>
                <h3>Score : {scores}</h3>
            </div>
            <div className='game-area'>
                <Snake snakeDots={snakeDots} />
                <Food foodPos={food} />
            </div>
        </div>
    )
}

export default GameBoard