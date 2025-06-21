Стек:

-   <a href="https://react.dev/">![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)</a>
-   <a href="https://reactrouter.com/6.30.1/start/tutorial">![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)</a>
-   <a href="https://www.typescriptlang.org/">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
-   <a href="https://sass-lang.com/">![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)</a>
-   <a href="https://vite.dev/">![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)</a>

Создана упрощенная копия приложения «Заметки» из операционной системы macOS с помощью React.<br>

Приложение состоит из боковой панели, области для просмотра / редактирования заметки и поиска по заметкам. Использована дизайн-система Material UI.<br>

Первая страница, которую увидит пользователь при запуске приложения — страница авторизации. Только после успешного входа в систему можно будет попасть в заметки.<br>

При выборе заметки отображается отрендеренный Markdown-текст. Там же располагаются три кнопки — «Добавить», «Редактировать» и «Удалить».<br>

При клике на кнопку «Редактировать» в рабочей области вместо отрендеренного текста отображается редактор. Во время редактирования сохранение контента происходит автоматически.<br>

При клике на кнопку «Удалить» происходит удаление заметки с предварительным подтверждением удаления (для подтверждения использовано стандартное модальное окно из дизайн-системы Material UI).<br>

Поиск по заметкам идет по частичному вхождению символов. Например, фразу «React — JavaScript-библиотека» можно будет найти даже по отрывку «cript».<br>

Для задания программный код размещен в компонентах App, Header, Sidebar, Workspace, Notes, Note, SearchBox, Dropdown, Modal, Signin, Signup. Использована архитектура Feature-sliced design. Для связи между компонентами использован Context API. Реализованы кастомные хуки useTimeout() и useDebounce().<br>

Приложение реализовано с помощью Markdown-редактора React SimpleMDE Editor: https://github.com/RIP21/react-simplemde-editor.<br>

Для хранения данных использована облачная платформа для разработки веб-приложений Firebase.<br>

Приложение переведено на PWA: https://apple-notes-copy.web.app/.
