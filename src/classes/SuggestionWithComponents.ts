/*
    Hold the recipe
*/
export class SuggestionWithComponents {
    public suggestion: string = "";
    public componentMap: Map<string, string[]> = new Map;
    /*
        constructor
    */    
    constructor(
        suggestion?: string,
        componentMap?: Map<string, string[]>,
    ) {
        // assignments with some defaults
        this.suggestion = suggestion ? suggestion : 'SUGGESTION';
        this.componentMap = componentMap ? componentMap : new Map([['ingredients', ['ing1']],['style', ['style1']],['allergy', ['allergy1']]]);
    }
}