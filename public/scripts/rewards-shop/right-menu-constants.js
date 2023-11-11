// bounds used for determing selected areas hover and mouse down events

// array position corresponds to selection mode
export const CANVAS_SELECTION_MODE_BOUNDS = [
    {'x1': 36, 'y1': 2, 'x2': 64, 'y2': 10},
    {'x1': 68, 'y1': 2, 'x2': 93, 'y2': 10},
    {'x1': 97, 'y1': 2, 'x2': 120, 'y2': 10}
]

// array position corresponds to plant id
export const CANVAS_PLANT_CARD_BOUNDS = [
    {'x1': 6, 'y1': 25, 'x2': 49, 'y2': 111},
    {'x1': 56, 'y1': 25, 'x2': 99, 'y2': 111},
    {'x1': 106, 'y1': 25, 'x2': 149, 'y2': 111},
    {'x1': 6, 'y1': 115, 'x2': 49, 'y2': 201},
    {'x1': 56, 'y1': 115, 'x2': 99, 'y2': 201},
    {'x1': 106, 'y1': 115, 'x2': 149, 'y2': 201}
]
// array position corresponds to color id
export const CANVAS_COLOR_SELECTION_BOUNDS = [
    {'x1': 46, 'y1': 216, 'x2': 54, 'y2': 224},
    {'x1': 57, 'y1': 216, 'x2': 65, 'y2': 224},
    {'x1': 68, 'y1': 216, 'x2': 76, 'y2': 224},
    {'x1': 79, 'y1': 216, 'x2': 87, 'y2': 224},
    {'x1': 90, 'y1': 216, 'x2': 98, 'y2': 224},
    {'x1': 101, 'y1': 216, 'x2': 109, 'y2': 224},
    {'x1': 112, 'y1': 216, 'x2': 120, 'y2': 224},
    {'x1': 123, 'y1': 216, 'x2': 131, 'y2': 224},
    {'x1': 134, 'y1': 216, 'x2': 142, 'y2': 224},
    {'x1': 46, 'y1': 226, 'x2': 54, 'y2': 234},
    {'x1': 57, 'y1': 226, 'x2': 65, 'y2': 234},
    {'x1': 68, 'y1': 226, 'x2': 76, 'y2': 234},
    {'x1': 79, 'y1': 226, 'x2': 87, 'y2': 234},
    {'x1': 90, 'y1': 226, 'x2': 98, 'y2': 234},
    {'x1': 101, 'y1': 226, 'x2': 109, 'y2': 234},
    {'x1': 112, 'y1': 226, 'x2': 120, 'y2': 234},
    {'x1': 123, 'y1': 226, 'x2': 131, 'y2': 234},
    {'x1': 134, 'y1': 226, 'x2': 142, 'y2': 234}
]
// array position corresponds to theme id
export const CANVAS_THEME_SELECTION_BOUNDS = [
    {'x1': 6, 'y1': 249, 'x2': 33, 'y2': 282},
    {'x1': 35, 'y1': 249, 'x2': 62, 'y2': 282},
    {'x1': 64, 'y1': 249, 'x2': 91, 'y2': 282},
    {'x1': 93, 'y1': 249, 'x2': 120, 'y2': 282},
    {'x1': 122, 'y1': 249, 'x2': 149, 'y2': 282}
]
export const PLANT_COST_LABEL_BOUNDS = {
    'x1': 55, 'y1': 206, 'x2': 75, 'y2': 210
}
export const POINTS_BUDGET_LABEL_BOUNDS = {
    'x1': 114, 'y1': 206, 'x2': 147, 'y2': 210
}

// coordinates correspond to top left positions on canvas
export const SELECTION_MODE_DRAWING_COORDINATES = [
    {'x': 36, 'y': 2},
    {'x': 68, 'y': 2},
    {'x': 97, 'y': 2}
]

// array position corresponds to plant id
export const PLANT_CARD_DRAWING_COORDINATES = [
    {'x': 6, 'y': 25},
    {'x': 56, 'y': 25},
    {'x': 106, 'y': 25},
    {'x': 6, 'y': 115},
    {'x': 56, 'y': 115},
    {'x': 106, 'y': 115}
]
// array position corresponds to color id
export const COLOR_SELECTION_DRAWING_COORDINATES = [
    {'x': 46, 'y': 216},
    {'x': 57, 'y': 216},
    {'x': 68, 'y': 216},
    {'x': 79, 'y': 216},
    {'x': 90, 'y': 216},
    {'x': 101, 'y': 216},
    {'x': 112, 'y': 216},
    {'x': 123, 'y': 216},
    {'x': 134, 'y': 216},
    {'x': 46, 'y': 226},
    {'x': 57, 'y': 226},
    {'x': 68, 'y': 226},
    {'x': 79, 'y': 226},
    {'x': 90, 'y': 226},
    {'x': 101, 'y': 226},
    {'x': 112, 'y': 226},
    {'x': 123, 'y': 226},
    {'x': 134, 'y': 226}
]
export const SELECTED_COLOR_DRAWING_COORDINATE = {
    'x': 17, 'y': 227
}
// array position corresponds to theme id
export const THEME_SELECTION_DRAWING_COORDINATES = [
    {'x': 6, 'y': 249},
    {'x': 35, 'y': 249},
    {'x': 64, 'y': 249},
    {'x': 93, 'y': 249},
    {'x': 122, 'y': 249}
]
export const PLANT_COST_LABEL_DRAWING_COORDINATES = {
    'x': 55, 'y': 206
}
export const POINTS_BUDGET_LABEL_DRAWING_COORDINATES = {
    'x': 114, 'y': 206
}

// array position corresponds to plantID
export const PLANT_CARD_PLANT_OFFSETS = [
    {'x': 10, 'y': 30},
    {'x': 11, 'y': 9},
    {'x': 8, 'y': 4},
    {'x': 6, 'y': 25},
    {'x': 10, 'y': 30},
    {'x': 6, 'y': 17}
]

export const NUM_PLANTS = 6;