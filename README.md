# 2024 공개 SW 개발자 대회

[공개SW 포털 - 공개SW 포털](https://www.oss.kr/dev_competition)

# 개요

## 개발 주제: 블록체인 기반 e-Wallet 신원 증명/ 자격 증명의 저장 및 관리

- 신원 증명: 사용자의 신원 확인
- 자격 증명: 사용자가 특정 서비스에 접근할 수 있는 권한 확인.
- 신원 증명서: W3C의 DID (Decentralized Identifier)과 VC (Verifiable Credentials) 데이터 모델 준수
    
    [https://web3explorer.medium.com/w3c의-표준으로-did-이해하기-1-c43ca45f78f7](https://web3explorer.medium.com/w3c%EC%9D%98-%ED%91%9C%EC%A4%80%EC%9C%BC%EB%A1%9C-did-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-1-c43ca45f78f7)
    
    https://www.didalliance.org/technical/did.php
    
- eWallet 규격: eIDAS의 EUDIW (European Digital ID Wallet) 기본 규범을 따름.
    
    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/402a5ef6-dd8b-47c6-b894-bae9266b4d98/90d5bbd2-4b06-4ae9-8f84-cf2025f583df/Untitled.png)
    
    https://www.linkedin.com/pulse/eu-wallet-depth-1-trusted-lists-andrew-tobin
    

## 개발 계기

- 현재의 중앙화된 데이터베이스에서의 데이터 유출 및 보안 문제를 해결하기 위해 블록체인 및 해싱을 활용한 e-Wallet 시스템 개발의 필요성을 느꼈습니다.
- 블록체인의 특성인 데이터의 불변성과 분산 관리로 해킹과 데이터 위조로부터 사용자의 신원 정보와 자격 증명을 보다 안전하게 보호할 수 있습니다.
- 블록체인 기반 시스템은 중앙화된 ID 관리 시스템에 의존하지 않고도 안전하게 신원 인증을 할 수 있으며, 모든 거래와 인증 과정이 공개적으로 기록되고 검증 가능하므로 사용자와 서비스 제공자 간의 신뢰가 증진됩니다.
- 블록체인 기술은 중개자가 필요하지 않고 직접적인 신원 인증이 가능하므로 비용을 절감하고 효율성을 높일 수 있습니다.
- 또한 블록체인 기술을 활용한 e-Wallet 시스템 개발은 최신 기술을 적용하여 시장에서 경쟁 우위를 확보할 수 있습니다.

## 프로젝트 소개

- 블록체인 및 해싱을 활용한 사용자 데이터 관리
- 전자 지갑 모바일 앱
- 신원 증명
    - DID
- 자격 증명
    - 인증 토큰 JWT(JSON Web Token)
    - 핀
- 저장 및 관리
    - 저장
        - 해싱
        - 토큰 생성
    - 관리
        - PIN 주기적 갱신 요구
        - 토큰
        - 세션 타임아웃
- 사용자 동의
    - 신원 및 자격 증명 정보를 수집, 저장, 사용할 때 명확한 동의 받기
    - 생체 정보 사용 동의
    - 카메라, 전화 등 기능 사용 동의
- ~~백업 및 복구~~
- 기능
    - 사용자 정보 저장
    - 민감한 정보 암호화
    - 불러올 때 복호화 해서 사용자 정보 일치하는 지 확인
    - 신원 확인 해서 권한 주고 받기
    - 신원 증명서 받아서 관리

## 프로젝트 소개

- 블록체인 및 해싱을 활용한 사용자 데이터 관리
- 전자 지갑 모바일 앱
- 신원 증명
    - 이름, 생년월일, 주소
    - 이메일, 전화번호
    - Id authentification
    - (가능하면) 지문 등 생체 인식
- 자격 증명
    - 인증 토큰 JWT(JSON Web Token) / OAuth
    - ^ https://wadekang.tistory.com/71
    - 핀
    - ~~지문, 생체 인식~~
- 저장 및 관리
    - 저장
        - 해싱
        - 토큰 생성
    - 관리
        - 주기적 갱신 요구 (핀)
        - 토큰 - 30일 주기
        - 세션 타임아웃 - 오랜 시간 비활성 상태일 경우 자동 로그아웃
- 사용자 동의
    - 신원 및 자격 증명 정보를 수집, 저장, 사용할 때 명확한 동의 받기
    - 생체 정보 사용 동의
    - 카메라, 전화 등 기능 사용 동의
- ~~백업 및 복구~~
- 기능
    - 사용자 정보 저장
    - 민감한 정보 암호화
    - 불러올 때 복호화 해서 사용자 정보 일치하는 지 확인
    - 신원 확인 해서 권한 주고 받기
    - 신원 증명서 받아서 관리

# 역할

서버

- 플로우 차트 및 ERD 설계 (같이)
- 블록 체인 설계 및 구현
- 해싱 설계 및 구현
- 사용자 정보를 입력 받아서 신원 및 권한 확인하는 로직 구현

프론트

- 앱 페이지 설계 및 구현
- 앱 페이지와 서버 연동

구분 X

- Github 관리

# 기술 스택

- JavaScript Hashing Wep APIs
    
    [URL.hash - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/URL/hash)
    
    https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API
    
    https://github.com/mdn/simple-shared-worker
    
    https://github.com/mdn/simple-web-worker/tree/main/web-workers/simple-web-worker
    
- Spring Boot로 JWT 로직 구현

# Referenced link trees

[https://launching-box.tistory.com/entry/파이썬-앱개발-자세하게-알아보도록-하겠습니다-2편](https://launching-box.tistory.com/entry/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%95%B1%EA%B0%9C%EB%B0%9C-%EC%9E%90%EC%84%B8%ED%95%98%EA%B2%8C-%EC%95%8C%EC%95%84%EB%B3%B4%EB%8F%84%EB%A1%9D-%ED%95%98%EA%B2%A0%EC%8A%B5%EB%8B%88%EB%8B%A4-2%ED%8E%B8)

[https://inpa.tistory.com/entry/JEST-📚-jest-문법-정리](https://inpa.tistory.com/entry/JEST-%F0%9F%93%9A-jest-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC)

[//bitkunst.tistory.com/entry/BlockChain-개인키-공개키-서명-지갑계정](https://bitkunst.tistory.com/entry/BlockChain-%EA%B0%9C%EC%9D%B8%ED%82%A4-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EC%84%9C%EB%AA%85-%EC%A7%80%EA%B0%91%EA%B3%84%EC%A0%95)

[https://bitkunst.tistory.com/entry/BlockChain-개인키-공개키-서명-지갑계정](https://bitkunst.tistory.com/entry/BlockChain-%EA%B0%9C%EC%9D%B8%ED%82%A4-%EA%B3%B5%EA%B0%9C%ED%82%A4-%EC%84%9C%EB%AA%85-%EC%A7%80%EA%B0%91%EA%B3%84%EC%A0%95)

https://github.com/ethereumbook/ethereumbook/blob/develop/code/aws/truffle-config.js

https://blog.naver.com/gowit_sps/220959581513

[https://velog.io/@genius_jihyepark/지갑의-사용과-지갑-개발](https://velog.io/@genius_jihyepark/%EC%A7%80%EA%B0%91%EC%9D%98-%EC%82%AC%EC%9A%A9%EA%B3%BC-%EC%A7%80%EA%B0%91-%EA%B0%9C%EB%B0%9C)[https://velog.io/@rlaekgks111/Project-Opensea-NFT-거래소-Clone-Coding](https://velog.io/@rlaekgks111/Project-Opensea-NFT-%EA%B1%B0%EB%9E%98%EC%86%8C-Clone-Coding)

https://www.nimbleappgenie.com/blogs/ewallet-app-development-guide/#1-eCommerce-Mobile-Commerce-Industry

https://chatgpt.com/c/6dcd4aba-510d-4097-9ad0-d1c60f7b42ea

[https://aws.amazon.com/ko/what-is/blockchain/?aws-products-all.sort-](https://aws.amazon.com/ko/what-is/blockchain/?aws-products-all.sort-by=item.additionalFields.productNameLowercase&aws-products-all.sort-order=asc)
