const fs = require('fs');
const path = require('path');

// Mock DOM
global.document = {
    getElementById: jest.fn((id) => ({ value: '', innerHTML: '', style: {} })),
    querySelector: jest.fn(() => ({ innerHTML: '', appendChild: jest.fn() })),
    createElement: jest.fn(() => ({ className: '', innerHTML: '', style: {}, appendChild: jest.fn() })),
    body: { style: {} },
    addEventListener: jest.fn()
};
global.window = {
    location: { search: '' },
    URLSearchParams: class { get() { return null; } }
};

// Load scripts
const rescueScript = fs.readFileSync(path.resolve(__dirname, '../js/rescue_terminal.js'), 'utf8');
eval(rescueScript);

const logDataScript = fs.readFileSync(path.resolve(__dirname, '../js/log_data.js'), 'utf8');
eval(logDataScript);

describe('Rescue Terminal Logic', () => {
    test('should match correct coordinates', () => {
        const inputMock = { value: "FROM [34.2140, 108.5500] TO [34.2158, 108.5521] DISTANCE 200m" };
        const resultMock = { innerHTML: '' };
        document.getElementById.mockImplementation((id) => {
            if (id === 'rescue-input') return inputMock;
            if (id === 'rescue-result') return resultMock;
        });

        checkCoordinates();
        expect(resultMock.innerHTML).toContain('COORDINATES MATCHED');
    });

    test('should reject invalid input', () => {
        const inputMock = { value: "Hello World" };
        const resultMock = { innerHTML: '' };
        document.getElementById.mockImplementation((id) => {
            if (id === 'rescue-input') return inputMock;
            if (id === 'rescue-result') return resultMock;
        });

        checkCoordinates();
        expect(resultMock.innerHTML).toContain('INVALID SYNTAX');
    });
});

describe('Log Data', () => {
    test('Log 104 should be a draft', () => {
        expect(LOG_DATA['104']).toBeDefined();
        expect(LOG_DATA['104'].isDraft).toBe(true);
    });
});
