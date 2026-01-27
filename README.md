# 📊 Data Visualization Dashboard (Side Project)

Excel 파일을 기반으로 데이터 집합을 생성하고,  
이를 다양한 차트로 시각화할 수 있는 **웹 기반 데이터 시각화 대시보드**입니다.

본 프로젝트는 현재 **개발 진행 중(WIP)**이며,  
Excel 데이터를 빠르게 탐색하고 시각화할 수 있는  
**개인용 BI 도구**를 목표로 합니다.

🔗 Demo  
- Demo: https://datadesign-dashboard.vercel.app/  

---

## ✨ 주요 기능

- Excel 파일 업로드 및 자동 데이터 집합 생성
- Sheet 단위 데이터 관리 (Table / Column 구조)
- 데이터 집합 기반 차트 시각화
- 드래그 앤 드롭 기반 대시보드 레이아웃
- eCharts 기반 다양한 시각화 컴포넌트
- 차트별 상세 설정
  - 축 (X / Y)
  - 차원 (Dimension)
  - 측정값 (Measure)
  - 집계 방식 (SUM, AVG 등)

---

## 📐 데이터 구조 설계 원칙

본 프로젝트는 Excel 파일을 업로드하여 데이터 집합(Dataset)을 생성할 때  
**명확한 데이터 구조 규칙**을 기반으로 동작합니다.

### Sheet → Table 매핑 규칙

- Excel 파일의 **각 Sheet는 하나의 Table(Dataset)** 로 인식됩니다.
- 모든 Sheet는 **동일한 구조 규칙을 반드시 만족해야 합니다.**

### 컬럼 메타데이터 규칙

- **첫 번째 행(Row)은 테이블의 컬럼 메타데이터로 해석됩니다.**
  - 각 셀 값은 컬럼명(Column Name)으로 사용됩니다.
- 컬럼 메타데이터는 데이터 집합의 구조를 정의하는 기준이 됩니다.

### Raw 데이터 규칙

- **두 번째 행부터는 Raw 데이터(Row Data)** 로 처리됩니다.
- 각 Row는 첫 번째 행에서 정의된 컬럼 구조를 따라야 합니다.
- 컬럼 메타데이터가 없거나,  
  데이터 행이 해당 구조를 만족하지 않는 경우 데이터 집합으로 등록할 수 없습니다.

> ⚠️ 본 프로젝트는  
> *"첫 행은 컬럼, 이후 행은 데이터"* 구조를 전제로 설계되어 있으며,  
> 이 조건을 만족하지 않는 Excel 파일은 업로드 대상이 아닙니다.

#### 예시

| id | name | age |
|----|------|-----|
| 1  | Kim  | 28  |
| 2  | Lee  | 31  |

- `id`, `name`, `age` → 컬럼 메타데이터
- 그 아래 행 → 데이터 레코드

---

## 🧩 화면 구성

### 공통 레이아웃

- 모든 화면에서 공통적으로 사용되는 레이아웃
- 데이터 집합 탐색 및 화면 전환을 위한 Navigation 구조
- shadcn/ui 기반 Sidebar 구성

### Upload

- Excel 파일 업로드
- Sheet 단위 데이터 집합 미리보기
- 데이터 집합 등록 기능

### Data Visualization

- 등록된 데이터 집합 기반 시각화
- 차트 컴포넌트 구성 및 설정
- 자유로운 대시보드 레이아웃 구성

---

## 🛠 사용 기술
### Frontend
- React 19
- TypeScript
- React Router v7
- Vite

### UI / Design System
- Tailwind CSS
- shadcn/ui (Radix UI 기반)
- Material UI
- MUI X TreeView
- Lucide Icons

### Data & Visualization
- Apache ECharts
- echarts-for-react
- xlsx

### Dashboard & Interaction
- flexlayout-react
- motion

### Form & Validation
- react-hook-form
- zod

---

## 🚀 프로젝트 목적

이 프로젝트는  
**Excel 기반 데이터를 빠르게 시각화하고 탐색할 수 있는 개인용 BI 도구**를 목표로 합니다.

- 복잡한 설정 없이 데이터 업로드
- 데이터 구조를 명확히 정의한 데이터 집합 관리
- 차트 중심의 직관적인 데이터 탐색

---

## 📌 향후 계획 (Planned)

- 📤 데이터 및 대시보드 **Export 기능**
- 💾 **JSON 기반 대시보드 저장 및 불러오기**
- 📊 새로운 시각화 컴포넌트 추가
  - Heatmap
  - Stacked Chart
  - Custom Chart
- 📂 데이터 집합 관리 기능 강화
- 🔐 사용자 권한 및 데이터 접근 제어

---

### 👀 한 줄 요약

Excel 데이터를 구조화하여 데이터 집합으로 관리하고,  
드래그 앤 드롭 대시보드에서 자유롭게 시각화할 수 있는  
**개발 진행 중인(Web BI) 사이드 프로젝트**
