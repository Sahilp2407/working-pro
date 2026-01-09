// User Information Questions
// These questions will be shown after each quiz completion

export const userInfoQuestions = [
    {
        id: 'q1',
        question: 'Sample Question 1?',
        type: 'text', // text, radio, checkbox
        required: true,
        options: [] // For radio/checkbox type
    },
    {
        id: 'q2',
        question: 'Sample Question 2?',
        type: 'radio',
        required: true,
        options: ['Option A', 'Option B', 'Option C', 'Option D']
    },
    {
        id: 'q3',
        question: 'Sample Question 3?',
        type: 'text',
        required: false,
        options: []
    }
];

// You can add more questions here
// Just follow the same format:
// {
//     id: 'unique_id',
//     question: 'Your question text?',
//     type: 'text' or 'radio' or 'checkbox',
//     required: true or false,
//     options: [] // empty for text, array of strings for radio/checkbox
// }
