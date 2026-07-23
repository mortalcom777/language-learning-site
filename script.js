function navigateToLanguage(language) {
    const languagePages = {
        'english': 'english.html',
        'kazakh': 'kazakh.html',
        'spanish': 'spanish.html',
        'korean': 'korean.html',
        'turkish': 'turkish.html'
    };
    
    if (languagePages[language]) {
        window.location.href = languagePages[language];
    }
}

function goBack() {
    window.location.href = 'index.html';
}

function switchTab(tabId) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

let currentTestAnswers = {};

function selectOption(questionId, optionId, isCorrect) {
    currentTestAnswers[questionId] = { optionId, isCorrect };
    
    const options = document.querySelectorAll(`[data-question="${questionId}"]`);
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`[data-question="${questionId}"][data-option="${optionId}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
}

function checkTest() {
    let correct = 0;
    let total = Object.keys(currentTestAnswers).length;
    
    for (let questionId in currentTestAnswers) {
        const answer = currentTestAnswers[questionId];
        const option = document.querySelector(`[data-question="${questionId}"][data-option="${answer.optionId}"]`);
        
        if (answer.isCorrect) {
            correct++;
            option.classList.add('correct');
            option.classList.remove('incorrect');
        } else {
            option.classList.add('incorrect');
            option.classList.remove('correct');
        }
    }
    
    const resultDiv = document.getElementById('test-result');
    if (resultDiv) {
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        resultDiv.innerHTML = `
            <div class="result-message ${percentage >= 70 ? 'success' : 'error'}">
                Р РµР·СѓР»СЊС‚Р°С‚: ${correct} РёР· ${total} РїСЂР°РІРёР»СЊРЅС‹С… РѕС‚РІРµС‚РѕРІ (${percentage}%)
                ${percentage >= 70 ? '<br>РћС‚Р»РёС‡РЅРѕ! Р’С‹ С…РѕСЂРѕС€Рѕ СѓСЃРІРѕРёР»Рё РјР°С‚РµСЂРёР°Р».' : '<br>Р РµРєРѕРјРµРЅРґСѓРµРј РїРѕРІС‚РѕСЂРёС‚СЊ СѓСЂРѕРє.'}
            </div>
        `;
    }
}

function resetTest() {
    currentTestAnswers = {};
    document.querySelectorAll('.test-option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    const resultDiv = document.getElementById('test-result');
    if (resultDiv) {
        resultDiv.innerHTML = '';
    }
}

function speakWord(text, lang) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    } else {
        alert('Р’Р°С€ Р±СЂР°СѓР·РµСЂ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚ СЃРёРЅС‚РµР· СЂРµС‡Рё');
    }
}

function checkTask(taskId, correctAnswers) {
    const userAnswer = document.getElementById(`task-${taskId}-answer`).value.trim().toLowerCase();
    const resultDiv = document.getElementById(`task-${taskId}-result`);
    
    let isCorrect = false;
    
    if (Array.isArray(correctAnswers)) {
        isCorrect = correctAnswers.some(answer => userAnswer === answer.toLowerCase());
    } else {
        isCorrect = userAnswer === correctAnswers.toLowerCase();
    }
    
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div class="result-message ${isCorrect ? 'success' : 'error'}">
                ${isCorrect ? 'вњ“ РџСЂР°РІРёР»СЊРЅРѕ!' : 'вњ— РќРµРїСЂР°РІРёР»СЊРЅРѕ. РџРѕРїСЂРѕР±СѓР№С‚Рµ РµС‰Рµ СЂР°Р·.'}
            </div>
        `;
    }
    
    return isCorrect;
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
});
