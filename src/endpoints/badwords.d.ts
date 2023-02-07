declare module 'bad-words' {
    class BadWordsFilter {
        isProfane(input: string): boolean;
    }
    export = BadWordsFilter;
}