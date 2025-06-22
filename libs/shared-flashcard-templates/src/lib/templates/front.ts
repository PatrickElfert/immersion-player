export const frontTemplate = `
<div data-testid="frontTemplate" class="container">
 <h2 data-testid="targetSentence" class="target">{{sentenceFront}}</h2>
</div>

<style
>
 * {
    box-sizing: border-box;
  }

 .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181B;
  color: white;
  padding: 2rem;
 }

 .target {
  background-color: #3F3F46;
  padding: 2rem;
  width: 100%;
  border-radius: 25px;
  text-align: center;
 }
</style>
`;
