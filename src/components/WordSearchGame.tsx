import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Heart, Star, TreePine, Gift } from "lucide-react";

interface Cell {
  letter: string;
  row: number;
  col: number;
  isBlank: boolean;
}

interface Word {
  word: string;
  displayWord: string;
  found: boolean;
  cells: { row: number; col: number }[];
}

const GRID_SIZE = 12;

const WORDS_TO_FIND = [
  { word: "SOFA", display: "SOFÁ" },
  { word: "ARVORE", display: "ÁRVORE" },
  { word: "PAI NATAL", display: "PAI NATAL" },
  { word: "FRIO", display: "FRIO" },
  { word: "AQUECER", display: "AQUECER" },
  { word: "VIAGENS", display: "VIAGENS" },
];

// Pre-designed grid with words placed
const GRID_TEMPLATE = [
  ["A", "Q", "U", "E", "C", "E", "R", "L", "M", "N", "O", "P"],
  ["V", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
  ["I", "S", "O", "F", "A", "N", "O", "P", "Q", "R", "S", "T"],
  ["A", "U", "V", "W", "X", "Y", "Z", "A", "B", "C", "D", "E"],
  ["G", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"],
  ["E", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A"],
  ["N", "P", "A", "I", " ", "N", "A", "T", "A", "L", "B", "C"],
  ["S", "D", "E", "F", "R", "I", "O", "I", "J", "K", "L", "M"],
  [" ", "O", "P", "Q", " ", "S", "T", "U", " ", "W", "X", "Y"],
  ["A", "R", "V", "O", "R", "E", "B", "C", "D", "E", "F", "G"],
  ["Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
  ["L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W"],
];

// Word positions in the grid
const WORD_POSITIONS: { [key: string]: { row: number; col: number }[] } = {
  "AQUECER": [
    { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
    { row: 0, col: 3 }, { row: 0, col: 4 }, { row: 0, col: 5 }, { row: 0, col: 6 },
  ],
  "SOFA": [
    { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 },
  ],
  "VIAGENS": [
    { row: 2, col: 0 }, { row: 3, col: 0 }, { row: 4, col: 0 },
    { row: 5, col: 0 }, { row: 6, col: 0 }, { row: 7, col: 0 }, { row: 8, col: 0 },
  ],
  "PAI NATAL": [
    { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 },
    { row: 6, col: 5 }, { row: 6, col: 6 }, { row: 6, col: 7 },
    { row: 6, col: 8 }, { row: 6, col: 9 },
  ],
  "FRIO": [
    { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 7, col: 7 },
  ],
  "ARVORE": [
    { row: 9, col: 0 }, { row: 9, col: 1 }, { row: 9, col: 2 },
    { row: 9, col: 3 }, { row: 9, col: 4 }, { row: 9, col: 5 },
  ],
};

export const WordSearchGame = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedCells, setSelectedCells] = useState<{ row: number; col: number }[]>([]);
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [allFound, setAllFound] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create grid from template
    const newGrid: Cell[][] = GRID_TEMPLATE.map((row, rowIndex) =>
      row.map((letter, colIndex) => ({
        letter,
        row: rowIndex,
        col: colIndex,
        isBlank: letter === " ",
      }))
    );
    setGrid(newGrid);

    // Initialize words
    const newWords: Word[] = WORDS_TO_FIND.map((w) => ({
      word: w.word,
      displayWord: w.display,
      found: false,
      cells: WORD_POSITIONS[w.word] || [],
    }));
    setWords(newWords);
    setFoundCells(new Set());
    setAllFound(false);
  };

  const getCellKey = (row: number, col: number) => `${row}-${col}`;

  const handleCellMouseDown = (row: number, col: number) => {
    if (grid[row][col].isBlank) return;
    setIsSelecting(true);
    setSelectedCells([{ row, col }]);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isSelecting || grid[row][col].isBlank) return;
    
    const lastCell = selectedCells[selectedCells.length - 1];
    if (!lastCell) return;

    // Check if cell is already selected
    if (selectedCells.some((c) => c.row === row && c.col === col)) return;

    // Allow only horizontal, vertical, or diagonal selection
    const rowDiff = Math.abs(row - selectedCells[0].row);
    const colDiff = Math.abs(col - selectedCells[0].col);
    
    const isHorizontal = rowDiff === 0;
    const isVertical = colDiff === 0;
    const isDiagonal = rowDiff === colDiff;

    if (isHorizontal || isVertical || isDiagonal) {
      // Build path from first cell to current cell
      const startRow = selectedCells[0].row;
      const startCol = selectedCells[0].col;
      const rowStep = row === startRow ? 0 : row > startRow ? 1 : -1;
      const colStep = col === startCol ? 0 : col > startCol ? 1 : -1;
      
      const newSelection: { row: number; col: number }[] = [];
      let currentRow = startRow;
      let currentCol = startCol;
      
      while (currentRow !== row || currentCol !== col) {
        if (!grid[currentRow][currentCol].isBlank) {
          newSelection.push({ row: currentRow, col: currentCol });
        }
        currentRow += rowStep;
        currentCol += colStep;
      }
      if (!grid[row][col].isBlank) {
        newSelection.push({ row, col });
      }
      
      setSelectedCells(newSelection);
    }
  };

  const handleMouseUp = useCallback(() => {
    if (!isSelecting) return;
    setIsSelecting(false);

    // Check if selection matches any word
    const selectedLetters = selectedCells
      .map((c) => grid[c.row][c.col].letter)
      .join("");
    const reversedLetters = [...selectedLetters].reverse().join("");

    const matchedWord = words.find(
      (w) =>
        !w.found &&
        (w.word.replace(/ /g, "") === selectedLetters.replace(/ /g, "") ||
          w.word.replace(/ /g, "") === reversedLetters.replace(/ /g, ""))
    );

    if (matchedWord) {
      const newFoundCells = new Set(foundCells);
      selectedCells.forEach((c) => newFoundCells.add(getCellKey(c.row, c.col)));
      setFoundCells(newFoundCells);

      const newWords = words.map((w) =>
        w.word === matchedWord.word ? { ...w, found: true } : w
      );
      setWords(newWords);

      toast.success(`Encontraste "${matchedWord.displayWord}"! 🎄`, {
        description: "Continua assim!",
      });

      // Check if all words found
      if (newWords.every((w) => w.found)) {
        setAllFound(true);
        toast.success("Parabéns! 🎉", {
          description: "Encontraste todas as palavras! Feliz Natal! ❤️",
          duration: 5000,
        });
      }
    }

    setSelectedCells([]);
  }, [isSelecting, selectedCells, grid, words, foundCells]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseUp]);

  const getCellClassName = (row: number, col: number) => {
    const cell = grid[row]?.[col];
    if (!cell) return "";
    
    if (cell.isBlank) return "grid-cell blank";
    
    const key = getCellKey(row, col);
    const isSelected = selectedCells.some((c) => c.row === row && c.col === col);
    const isFound = foundCells.has(key);

    return cn(
      "grid-cell",
      isSelected && "selected",
      isFound && "found"
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
      {/* Game Grid */}
      <div
        className={cn(
          "bg-card/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-card border border-border/50",
          allFound && "animate-celebrate"
        )}
      >
        <div
          className="grid gap-1 select-none"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          }}
          onMouseLeave={() => isSelecting && setIsSelecting(false)}
        >
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={getCellKey(rowIndex, colIndex)}
                className={cn(
                  "w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center",
                  "rounded-lg font-bold text-sm sm:text-base md:text-lg cursor-pointer",
                  "bg-muted/60 border border-border/30",
                  getCellClassName(rowIndex, colIndex)
                )}
                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                onTouchStart={() => handleCellMouseDown(rowIndex, colIndex)}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  const element = document.elementFromPoint(touch.clientX, touch.clientY);
                  if (element) {
                    const cellCoords = element.getAttribute("data-coords");
                    if (cellCoords) {
                      const [r, c] = cellCoords.split("-").map(Number);
                      handleCellMouseEnter(r, c);
                    }
                  }
                }}
                data-coords={`${rowIndex}-${colIndex}`}
              >
                {cell.isBlank ? "" : cell.letter}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Word List */}
      <div className="bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-card border border-border/50 min-w-[200px]">
        <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Palavras
        </h3>
        <div className="space-y-3">
          {words.map((word, index) => (
            <div
              key={word.word}
              className={cn(
                "flex items-center gap-3 transition-all duration-300",
                word.found && "opacity-60"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                  word.found
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {word.found ? (
                  <Star className="w-4 h-4 fill-current" />
                ) : (
                  <TreePine className="w-4 h-4" />
                )}
              </div>
              <span
                className={cn(
                  "font-medium transition-all duration-300",
                  word.found && "line-through text-muted-foreground"
                )}
              >
                {word.displayWord}
              </span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progresso</span>
            <span>{words.filter((w) => w.found).length}/{words.length}</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-festive transition-all duration-500 ease-out"
              style={{
                width: `${(words.filter((w) => w.found).length / words.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {allFound && (
          <div className="mt-6 p-4 bg-secondary/20 rounded-xl text-center animate-fade-in">
            <Heart className="w-8 h-8 text-primary mx-auto mb-2 animate-pulse" />
            <p className="font-display text-lg font-bold text-foreground">
              Feliz Natal!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Com muito amor ❤️
            </p>
          </div>
        )}

        <button
          onClick={initializeGame}
          className="mt-4 w-full py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium transition-colors duration-200"
        >
          Recomeçar
        </button>
      </div>
    </div>
  );
};
