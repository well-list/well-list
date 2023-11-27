export const EXIT_BUTTON = 'exit-button';
export const NEXT_BUTTON = 'next-month-button';
export const PREVIOUS_BUTTON = 'previous-month-button';
export const MONTH_MARKER = 'month-marker';
export const YEAR_MARKER = 'year-marker';

export const BUTTON_WIDTH = 7;

// used for determing selected areas hover and mouse down events
export const CANVAS_BOUNDS = {
    [EXIT_BUTTON]: {'x1': 3, 'y1': 4, 'x2': 11, 'y2': 37},
    [NEXT_BUTTON]: {'x1': 3, 'y1': 42, 'x2': 11, 'y2': 70},
    [PREVIOUS_BUTTON]: {'x1': 3, 'y1': 71, 'x2': 11, 'y2': 101}
}

// top left position on canvas
export const DRAWING_COORDINATES = {
    [EXIT_BUTTON]: {'x': 4, 'y': 4},
    [NEXT_BUTTON]: {'x': 4, 'y': 43},
    [PREVIOUS_BUTTON]: {'x': 4, 'y': 72},
    [MONTH_MARKER]: {'x': 4, 'y': 106},
    [YEAR_MARKER]: {'x': 6, 'y': 133}
}

// array position corresponds to theme id
export const THEME_BACKGROUND_COLORS = [
    '#001532',
    '#1a1a1a',
    '#320000',
    '#042714',
    '#2c1700'
]