import { useCallback, useEffect, useMemo, useState } from 'react'

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const BASE_DROP_SPEED = 700
const MIN_DROP_SPEED = 120

const TETROMINOES = {
    I: {
        color: '#22d3ee',
        shape: [[1, 1, 1, 1]],
    },
    J: {
        color: '#60a5fa',
        shape: [
            [1, 0, 0],
            [1, 1, 1],
        ],
    },
    L: {
        color: '#fb923c',
        shape: [
            [0, 0, 1],
            [1, 1, 1],
        ],
    },
    O: {
        color: '#facc15',
        shape: [
            [1, 1],
            [1, 1],
        ],
    },
    S: {
        color: '#4ade80',
        shape: [
            [0, 1, 1],
            [1, 1, 0],
        ],
    },
    T: {
        color: '#c084fc',
        shape: [
            [0, 1, 0],
            [1, 1, 1],
        ],
    },
    Z: {
        color: '#f87171',
        shape: [
            [1, 1, 0],
            [0, 1, 1],
        ],
    },
}

const TETROMINO_KEYS = Object.keys(TETROMINOES)

const createEmptyRow = () => Array(BOARD_WIDTH).fill(null)
const createEmptyBoard = () => Array.from({ length: BOARD_HEIGHT }, createEmptyRow)

const getRandomType = () => {
    const randomIndex = Math.floor(Math.random() * TETROMINO_KEYS.length)
    return TETROMINO_KEYS[randomIndex]
}

const cloneShape = (shape) => shape.map((row) => [...row])

const getSpawnPiece = (type) => {
    const pieceType = type ?? getRandomType()
    const tetromino = TETROMINOES[pieceType]
    const shape = cloneShape(tetromino.shape)
    return {
        type: pieceType,
        color: tetromino.color,
        shape,
        x: Math.floor((BOARD_WIDTH - shape[0].length) / 2),
        y: -1,
    }
}

const rotateShapeClockwise = (shape) =>
    shape[0].map((_, columnIndex) => shape.map((row) => row[columnIndex]).reverse())

const isValidMove = (board, piece, offsetX = 0, offsetY = 0, nextShape = piece.shape) => {
    for (let y = 0; y < nextShape.length; y += 1) {
        for (let x = 0; x < nextShape[y].length; x += 1) {
            if (!nextShape[y][x]) {
                continue
            }

            const nextX = piece.x + x + offsetX
            const nextY = piece.y + y + offsetY

            if (nextX < 0 || nextX >= BOARD_WIDTH || nextY >= BOARD_HEIGHT) {
                return false
            }

            if (nextY >= 0 && board[nextY][nextX]) {
                return false
            }
        }
    }

    return true
}

const mergePieceIntoBoard = (board, piece) => {
    const mergedBoard = board.map((row) => [...row])

    piece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (!cell) {
                return
            }

            const boardY = piece.y + y
            const boardX = piece.x + x

            if (boardY >= 0) {
                mergedBoard[boardY][boardX] = piece.color
            }
        })
    })

    return mergedBoard
}

const clearCompletedLines = (board) => {
    let linesCleared = 0

    const remainingRows = board.filter((row) => {
        const isCompleted = row.every(Boolean)
        if (isCompleted) {
            linesCleared += 1
        }
        return !isCompleted
    })

    const clearedBoard = [
        ...Array.from({ length: linesCleared }, createEmptyRow),
        ...remainingRows,
    ]

    return { clearedBoard, linesCleared }
}

const getLineScore = (linesCleared) => {
    const scoreTable = [0, 100, 300, 500, 800]
    return scoreTable[linesCleared] ?? 0
}

const TetrisGame = ({ onExit }) => {
    const [board, setBoard] = useState(createEmptyBoard)
    const [currentPiece, setCurrentPiece] = useState(() => getSpawnPiece())
    const [nextType, setNextType] = useState(() => getRandomType())
    const [score, setScore] = useState(0)
    const [lines, setLines] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [viewport, setViewport] = useState(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : 1280,
        height: typeof window !== 'undefined' ? window.innerHeight : 720,
    }))

    const level = Math.floor(lines / 10) + 1
    const dropSpeed = Math.max(MIN_DROP_SPEED, BASE_DROP_SPEED - (level - 1) * 70)
    const isMobileViewport = viewport.width < 768

    const mobileBoardWidth = useMemo(() => {
        if (!isMobileViewport) {
            return null
        }

        const widthLimit = viewport.width - 56
        const heightLimit = (viewport.height - 340) / 2
        const preferredSize = Math.min(widthLimit, heightLimit, 320)

        return Math.max(140, preferredSize)
    }, [isMobileViewport, viewport.height, viewport.width])

    const resetGame = useCallback(() => {
        setBoard(createEmptyBoard())
        setCurrentPiece(getSpawnPiece())
        setNextType(getRandomType())
        setScore(0)
        setLines(0)
        setGameOver(false)
    }, [])

    useEffect(() => {
        const syncViewport = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        syncViewport()
        window.addEventListener('resize', syncViewport)

        return () => window.removeEventListener('resize', syncViewport)
    }, [])

    const moveHorizontal = useCallback(
        (direction) => {
            if (!currentPiece || gameOver) {
                return
            }

            if (!isValidMove(board, currentPiece, direction, 0)) {
                return
            }

            setCurrentPiece((prev) => ({ ...prev, x: prev.x + direction }))
        },
        [board, currentPiece, gameOver],
    )

    const rotatePiece = useCallback(() => {
        if (!currentPiece || gameOver) {
            return
        }

        const rotatedShape = rotateShapeClockwise(currentPiece.shape)
        const wallKickOffsets = [0, -1, 1, -2, 2]

        for (const offsetX of wallKickOffsets) {
            if (isValidMove(board, currentPiece, offsetX, 0, rotatedShape)) {
                setCurrentPiece((prev) => ({
                    ...prev,
                    x: prev.x + offsetX,
                    shape: rotatedShape,
                }))
                return
            }
        }
    }, [board, currentPiece, gameOver])

    const spawnNextPiece = useCallback(
        (updatedBoard) => {
            const spawnedPiece = getSpawnPiece(nextType)
            const upcomingType = getRandomType()

            if (!isValidMove(updatedBoard, spawnedPiece)) {
                setGameOver(true)
                return
            }

            setCurrentPiece(spawnedPiece)
            setNextType(upcomingType)
        },
        [nextType],
    )

    const moveDown = useCallback(() => {
        if (!currentPiece || gameOver) {
            return
        }

        if (isValidMove(board, currentPiece, 0, 1)) {
            setCurrentPiece((prev) => ({ ...prev, y: prev.y + 1 }))
            return
        }

        const mergedBoard = mergePieceIntoBoard(board, currentPiece)
        const { clearedBoard, linesCleared } = clearCompletedLines(mergedBoard)

        setBoard(clearedBoard)

        if (linesCleared > 0) {
            setLines((prev) => prev + linesCleared)
            setScore((prev) => prev + getLineScore(linesCleared) * level)
        }

        spawnNextPiece(clearedBoard)
    }, [board, currentPiece, gameOver, level, spawnNextPiece])

    useEffect(() => {
        if (gameOver) {
            return undefined
        }

        const intervalId = window.setInterval(moveDown, dropSpeed)
        return () => window.clearInterval(intervalId)
    }, [dropSpeed, gameOver, moveDown])

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault()
                    moveHorizontal(-1)
                    break
                case 'ArrowRight':
                    event.preventDefault()
                    moveHorizontal(1)
                    break
                case 'ArrowDown':
                    event.preventDefault()
                    moveDown()
                    break
                case 'ArrowUp':
                    event.preventDefault()
                    rotatePiece()
                    break
                case 'Enter':
                    if (gameOver) {
                        event.preventDefault()
                        resetGame()
                    }
                    break
                default:
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [gameOver, moveDown, moveHorizontal, resetGame, rotatePiece])

    const displayBoard = useMemo(() => {
        const boardWithPiece = board.map((row) => [...row])

        if (!currentPiece || gameOver) {
            return boardWithPiece
        }

        currentPiece.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (!cell) {
                    return
                }

                const boardY = currentPiece.y + y
                const boardX = currentPiece.x + x

                if (
                    boardY >= 0 &&
                    boardY < BOARD_HEIGHT &&
                    boardX >= 0 &&
                    boardX < BOARD_WIDTH
                ) {
                    boardWithPiece[boardY][boardX] = currentPiece.color
                }
            })
        })

        return boardWithPiece
    }, [board, currentPiece, gameOver])

    const nextShape = TETROMINOES[nextType]?.shape ?? []
    const nextColor = TETROMINOES[nextType]?.color ?? '#94a3b8'

    return (
        <div className="mx-auto w-full max-w-4xl max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-2xl border border-cyan-400/30 bg-slate-950/90 p-3 shadow-[0_0_60px_rgba(34,211,238,0.25)] sm:max-h-none sm:overflow-visible sm:p-5 md:p-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-5">
                <div>
                    <h2 className="text-xl font-bold text-cyan-300 sm:text-2xl">Tetris Mode</h2>
                    <p className="text-xs text-slate-300 sm:text-sm">Kontrol keyboard: Arrow Left/Right/Down, Arrow Up untuk rotate.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={resetGame}
                        className="rounded-lg border border-cyan-400/50 px-3 py-2 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-400/10 sm:px-4 sm:text-sm"
                    >
                        Restart
                    </button>
                    <button
                        onClick={onExit}
                        className="rounded-lg border border-red-400/50 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/10 sm:px-4 sm:text-sm"
                    >
                        Keluar
                    </button>
                </div>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-[minmax(0,1fr)_220px]">
                <div
                    className="mx-auto w-full max-w-[360px] md:w-[min(84vw,360px)]"
                    style={isMobileViewport && mobileBoardWidth ? { width: `${mobileBoardWidth}px` } : undefined}
                >
                    <div
                        className="grid overflow-hidden rounded-md border border-slate-700 bg-slate-900/80"
                        style={{ gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))` }}
                    >
                        {displayBoard.flatMap((row, rowIndex) =>
                            row.map((cell, columnIndex) => (
                                <div
                                    key={`${rowIndex}-${columnIndex}`}
                                    className="aspect-square border border-slate-800/70"
                                    style={{
                                        backgroundColor: cell ?? 'rgba(15, 23, 42, 0.92)',
                                    }}
                                />
                            )),
                        )}
                    </div>

                    <div className="mt-3 rounded-xl border border-slate-700 bg-slate-900/60 p-2.5 md:hidden">
                        <p className="mb-3 text-center text-xs text-slate-300">Kontrol sentuh</p>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={rotatePiece}
                                className="flex h-10 w-40 items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-800/80 text-[10px] font-bold text-cyan-200 active:scale-95"
                                aria-label="Rotate"
                            >
                                ROT
                            </button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => moveHorizontal(-1)}
                                className="flex h-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-800/80 text-lg text-cyan-200 active:scale-95"
                                aria-label="Move left"
                            >
                                L
                            </button>
                            <button
                                type="button"
                                onClick={moveDown}
                                className="flex h-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-800/80 text-lg text-cyan-200 active:scale-95"
                                aria-label="Move down"
                            >
                                D
                            </button>
                            <button
                                type="button"
                                onClick={() => moveHorizontal(1)}
                                className="flex h-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-800/80 text-lg text-cyan-200 active:scale-95"
                                aria-label="Move right"
                            >
                                R
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 rounded-xl border border-slate-700 bg-slate-900/60 p-2.5 sm:space-y-4 sm:p-4">
                    <div className={`grid gap-2 text-xs sm:gap-3 sm:text-sm ${isMobileViewport ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        <div className="rounded-lg bg-slate-800/80 p-2.5 sm:p-3">
                            <p className="text-slate-400">Score</p>
                            <p className="text-lg font-bold text-white sm:text-xl">{score}</p>
                        </div>
                        <div className="rounded-lg bg-slate-800/80 p-2.5 sm:p-3">
                            <p className="text-slate-400">Level</p>
                            <p className="text-lg font-bold text-white sm:text-xl">{level}</p>
                        </div>
                        <div className="rounded-lg bg-slate-800/80 p-2.5 sm:p-3">
                            <p className="text-slate-400">Lines</p>
                            <p className="text-lg font-bold text-white sm:text-xl">{lines}</p>
                        </div>
                        {!isMobileViewport && (
                            <div className="rounded-lg bg-slate-800/80 p-2.5 sm:p-3">
                                <p className="text-slate-400">Speed</p>
                                <p className="text-lg font-bold text-white sm:text-xl">{dropSpeed}ms</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="mb-2 text-xs text-slate-400 sm:text-sm">Next Piece</p>
                        <div className="inline-grid gap-1 rounded-lg border border-slate-700 bg-slate-900 p-2.5 sm:p-3">
                            {nextShape.map((row, rowIndex) => (
                                <div key={`next-row-${rowIndex}`} className="flex gap-1">
                                    {row.map((cell, columnIndex) => (
                                        <div
                                            key={`next-cell-${rowIndex}-${columnIndex}`}
                                            className="h-4 w-4 rounded-sm border border-slate-700 sm:h-5 sm:w-5"
                                            style={{
                                                backgroundColor: cell ? nextColor : 'rgba(15, 23, 42, 0.92)',
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {gameOver && (
                        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200 sm:text-sm">
                            Game over. Tekan Enter atau klik Restart.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TetrisGame
