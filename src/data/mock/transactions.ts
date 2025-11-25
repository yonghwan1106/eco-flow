// 도서 대출 이력 및 상호대차 Mock 데이터

export interface Book {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  callNumber: string;
  popularity: number; // 인기도 (1-100)
}

export interface LoanTransaction {
  id: string;
  bookIsbn: string;
  bookTitle: string;
  author: string;
  borrowLibrary: string;
  returnLibrary: string;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  renewCount: number;
  isILL: boolean; // 상호대차 여부
}

export interface ILLRequest {
  id: string;
  status: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7; // 상호대차 상태값
  // 0:신청,1:발송,2:발송거절,3:입수,4:타관도서대여,5:완료,6:신청취소,7:미도서대여발송
  providerLibrary: string;
  borrowerLibrary: string;
  bookTitle: string;
  author: string;
  isbn: string;
  requestDate: string;
  sendDate: string | null;
  receiveDate: string | null;
  rejectReason: string | null;
}

// 인기 도서 목록 (한강 작가 포함)
export const popularBooks: Book[] = [
  {
    isbn: "9788936434120",
    title: "채식주의자",
    author: "한강",
    publisher: "창비",
    callNumber: "813.7-한15채",
    popularity: 98,
  },
  {
    isbn: "9788954651134",
    title: "소년이 온다",
    author: "한강",
    publisher: "창비",
    callNumber: "813.7-한15소",
    popularity: 96,
  },
  {
    isbn: "9788936438531",
    title: "작별하지 않는다",
    author: "한강",
    publisher: "문학동네",
    callNumber: "813.7-한15작",
    popularity: 94,
  },
  {
    isbn: "9788937473395",
    title: "흰",
    author: "한강",
    publisher: "문학동네",
    callNumber: "813.7-한15흰",
    popularity: 92,
  },
  {
    isbn: "9788954672214",
    title: "바람이 분다, 가라",
    author: "한강",
    publisher: "문학동네",
    callNumber: "813.7-한15바",
    popularity: 88,
  },
  {
    isbn: "9791191114584",
    title: "불편한 편의점",
    author: "김호연",
    publisher: "나무옆의자",
    callNumber: "813.7-김95불",
    popularity: 85,
  },
  {
    isbn: "9788936478315",
    title: "아몬드",
    author: "손원평",
    publisher: "창비",
    callNumber: "813.7-손67아",
    popularity: 82,
  },
  {
    isbn: "9788954677103",
    title: "달러구트 꿈 백화점",
    author: "이미예",
    publisher: "팩토리나인",
    callNumber: "813.7-이39달",
    popularity: 80,
  },
  {
    isbn: "9788934997214",
    title: "이토록 평범한 미래",
    author: "김연수",
    publisher: "문학동네",
    callNumber: "813.7-김64이",
    popularity: 75,
  },
  {
    isbn: "9788901267494",
    title: "트렌드 코리아 2025",
    author: "김난도",
    publisher: "미래의창",
    callNumber: "331.54-김19트",
    popularity: 78,
  },
];

// 최근 대출 트랜잭션 생성
export function generateLoanTransactions(days: number = 30): LoanTransaction[] {
  const transactions: LoanTransaction[] = [];
  const libraries = [
    "LIB001", "LIB002", "LIB003", "LIB004", "LIB005",
    "LIB006", "LIB007", "LIB008", "LIB009", "LIB010",
  ];

  for (let i = 0; i < 500; i++) {
    const book = popularBooks[Math.floor(Math.random() * popularBooks.length)];
    const borrowLib = libraries[Math.floor(Math.random() * libraries.length)];
    const returnLib = Math.random() > 0.7
      ? libraries[Math.floor(Math.random() * libraries.length)]
      : borrowLib;

    const loanDate = new Date();
    loanDate.setDate(loanDate.getDate() - Math.floor(Math.random() * days));

    const dueDate = new Date(loanDate);
    dueDate.setDate(dueDate.getDate() + 14);

    const isReturned = Math.random() > 0.3;
    const returnDate = isReturned
      ? new Date(loanDate.getTime() + Math.random() * 14 * 24 * 60 * 60 * 1000)
      : null;

    transactions.push({
      id: `TRX${String(i + 1).padStart(6, "0")}`,
      bookIsbn: book.isbn,
      bookTitle: book.title,
      author: book.author,
      borrowLibrary: borrowLib,
      returnLibrary: returnLib,
      loanDate: loanDate.toISOString().split("T")[0],
      dueDate: dueDate.toISOString().split("T")[0],
      returnDate: returnDate?.toISOString().split("T")[0] ?? null,
      renewCount: Math.floor(Math.random() * 3),
      isILL: borrowLib !== returnLib,
    });
  }

  return transactions.sort((a, b) =>
    new Date(b.loanDate).getTime() - new Date(a.loanDate).getTime()
  );
}

// 상호대차 요청 생성
export function generateILLRequests(): ILLRequest[] {
  const requests: ILLRequest[] = [];
  const libraries = [
    "LIB001", "LIB002", "LIB003", "LIB004", "LIB005",
    "LIB006", "LIB007", "LIB008", "LIB009", "LIB010",
  ];
  const statuses: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7)[] = [0, 1, 2, 3, 4, 5, 6, 7];
  const rejectReasons = [
    "도서 훼손",
    "대출 중",
    "분실 도서",
    "비치 불가 자료",
    null,
  ];

  for (let i = 0; i < 100; i++) {
    const book = popularBooks[Math.floor(Math.random() * popularBooks.length)];
    const provider = libraries[Math.floor(Math.random() * libraries.length)];
    let borrower = libraries[Math.floor(Math.random() * libraries.length)];
    while (borrower === provider) {
      borrower = libraries[Math.floor(Math.random() * libraries.length)];
    }

    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const requestDate = new Date();
    requestDate.setDate(requestDate.getDate() - Math.floor(Math.random() * 14));

    const sendDate = status >= 1 && status !== 2 && status !== 6
      ? new Date(requestDate.getTime() + Math.random() * 2 * 24 * 60 * 60 * 1000)
      : null;

    const receiveDate = status >= 3 && status !== 6
      ? new Date((sendDate?.getTime() ?? requestDate.getTime()) + Math.random() * 3 * 24 * 60 * 60 * 1000)
      : null;

    requests.push({
      id: `ILL${String(i + 1).padStart(6, "0")}`,
      status,
      providerLibrary: provider,
      borrowerLibrary: borrower,
      bookTitle: book.title,
      author: book.author,
      isbn: book.isbn,
      requestDate: requestDate.toISOString().split("T")[0],
      sendDate: sendDate?.toISOString().split("T")[0] ?? null,
      receiveDate: receiveDate?.toISOString().split("T")[0] ?? null,
      rejectReason: status === 2
        ? rejectReasons[Math.floor(Math.random() * (rejectReasons.length - 1))]
        : null,
    });
  }

  return requests;
}

// 상호대차 상태 한글 변환
export function getILLStatusText(status: number): string {
  const statusMap: Record<number, string> = {
    0: "신청",
    1: "발송",
    2: "발송거절",
    3: "입수",
    4: "타관도서대여",
    5: "완료",
    6: "신청취소",
    7: "미대출발송",
  };
  return statusMap[status] ?? "알수없음";
}

// 상호대차 상태 색상
export function getILLStatusColor(status: number): string {
  const colorMap: Record<number, string> = {
    0: "bg-blue-100 text-blue-800",
    1: "bg-yellow-100 text-yellow-800",
    2: "bg-red-100 text-red-800",
    3: "bg-purple-100 text-purple-800",
    4: "bg-green-100 text-green-800",
    5: "bg-gray-100 text-gray-800",
    6: "bg-gray-100 text-gray-800",
    7: "bg-orange-100 text-orange-800",
  };
  return colorMap[status] ?? "bg-gray-100 text-gray-800";
}
