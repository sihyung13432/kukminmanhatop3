// 1. 가상의 사용자 데이터
const onlineUsers = ['날아라슈퍼보드', '아기공룡둘리', '슈퍼짱짱맨', '따따베', '야르야르'];

document.addEventListener('DOMContentLoaded', () => {
    
    // --- [기능 1] 온라인 사용자 목록 생성 ---
    const onlineUsersList = document.getElementById('online-users');
    if (onlineUsersList) {
        onlineUsers.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = user;
            onlineUsersList.appendChild(listItem);
        });
    }

    // --- [기능 2] 사이드바 토글 기능 ---
    const toggleBtn = document.getElementById('toggle-sidebar-btn');
    const sidebar = document.getElementById('sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            toggleBtn.textContent = sidebar.classList.contains('active') ? '닫기' : '접속자 명단';
        });
    }

    // --- [기능 3] 무조건 수동 이미지 슬라이드 (수정됨) ---
    const slides = document.querySelectorAll('.slideshow img');
    let currentSlideIndex = 0;
  
    function showNextSlide() {
        if (slides.length > 0) {
            // 클릭 시 다음 인덱스로 이동 (마지막이면 0으로 리셋)
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;

            slides.forEach((slide) => {
                // 이미지를 왼쪽으로 밀어서 보여줌
                slide.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
                slide.classList.remove('active');
            });
            slides[currentSlideIndex].classList.add('active');
        }
    }
  
    // 자동 실행(setInterval) 없이 오직 클릭 이벤트만 연결
    if (slides.length > 0) {
        slides.forEach(slide => {
            slide.style.cursor = 'pointer'; // 클릭 가능하다는 커서 표시
            slide.addEventListener('click', showNextSlide);
        });
    }

    // --- [기능 4] 게시글 추가 기능 ---
    const submitBtn = document.getElementById('submit-btn');
    const postContainer = document.getElementById('post-container');
  
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const postTitle = document.getElementById('post-title').value;
            const postContent = document.getElementById('post-content').value;
  
            if (postTitle.trim() === '' || postContent.trim() === '') {
                alert('제목과 내용을 모두 입력해주세요.');
                return;
            }
  
            const postElement = createPostElement(postTitle, postContent);
            postContainer.appendChild(postElement);
  
            document.getElementById('post-title').value = '';
            document.getElementById('post-content').value = '';
        });
    }
  
    function createPostElement(title, content) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
  
        const contentElement = document.createElement('p');
        contentElement.textContent = content;
  
        postElement.appendChild(titleElement);
        postElement.appendChild(contentElement);
  
        return postElement;
    }
});

// --- [기능 5] 챗봇 및 기타 함수 ---
function showAlert(schedule) {
    alert(schedule);
}

$(document).ready(function () {
    $('#loading').hide();
});

function chatGPT() {
    const api_key = "sk-LpwtgBuJ46vdLtNHQxyCT3Bl"; // API 보안 주의
    const keywords = document.getElementById('keywords').value;
    $('#loading').show();

    const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: keywords + '에 대하여 최대한 도움이 되는 답변을 해줘.' },
    ];

    const data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
    };

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key + "bkFJVGC5YKqxjkjZ2jgvgkxp",
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    }).then(function (response) {
        $('#loading').hide();
        let result = document.getElementById('result');
        let pre = document.createElement('pre');
        pre.innerHTML = "\n\n" + response.choices[0].message.content;
        result.appendChild(pre);
        document.getElementById('keywords').value = '';
    });
}