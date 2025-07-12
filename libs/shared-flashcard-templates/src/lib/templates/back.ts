import { generateFuriganaTemplate, createTargetWordsTemplate } from './utils/utils.js';

export const backTemplate = `
 <div data-testid="backTemplate" class="container">
 <div class="answer">
  <div class="answerContainer">
    <h2 id="targetSentence" data-testid="targetSentence"></h2id>
    <h2 id="targetWord"></h2>
  </div>
 </div>
  <img data-testid="screenshot" class="image" src="{{image}}" />

  <div class="audio-wrapper">
  <button id="customPlayButton" data-testid="playButton" aria-label="Play audio">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7z"/>
    </svg>
  </button>
  <audio id="sentenceAudio" data-testid="sentenceAudio">
    <source src="{{sentenceAudio}}" type="audio/mpeg" />
  </audio>
</div>
 </div>
<style
>
 * {
    box-sizing: border-box;
  }

  .audio-wrapper button {
    border-radius: 25px;
    border: none;
    background-color: #71717A;
  }

  .audio-wrapper button:hover {
    filter: brightness(1.2);
  }

  .image {
   margin: 2rem;
   height: 200px;
   width: auto
  }

 .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #18181B;
  color: white;
  padding: 2rem;
 }

 .answer {
  background-color: #3F3F46;
  width: 100%;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
 }

 .answerContent {
  text-align: left !important;
 }
</style>

<script>
  ${generateFuriganaTemplate.toString()}
  ${createTargetWordsTemplate.toString()}

  const rawTargetWords = '{{targetWords}}';
  const rawSentence = '{{sentenceBack}}';

  const targetWordsTemplate = createTargetWordsTemplate(JSON.parse(rawTargetWords));
  const processedSentence = generateFuriganaTemplate(JSON.parse(rawSentence));

  const targetWordContainer = document.getElementById('targetWord');
  const sentenceContainer = document.getElementById('targetSentence')

  targetWordContainer.innerHTML = targetWordsTemplate;
  sentenceContainer.innerHTML = processedSentence;

  const playButton = document.getElementById('customPlayButton');
  const audioElement = document.getElementById('sentenceAudio');

  playButton.addEventListener('click', () => {
    if(audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.currentTime = 0;
      audioElement.pause();
    }
  });

</script>
`;
