import { DiagnosisResult } from '../types';
import { DIAGNOSIS_TEXTS } from '../constants/diagnosisTexts';
import { QUESTIONS } from '../constants';

type Score = {
  speed: number;
  careful: number;
  idea: number;
  data: number;
};

// 各選択肢に対するスコアのマッピング
// [speed, careful, idea, data]
const scoreMap: Record<string, number[]>[] = [
  // Q1: 従業員数
  {
    "10人未満": [2, 0, 1, 0],
    "10人〜100人未満": [1, 1, 1, 1],
    "100人〜1,000人未満": [0, 2, 0, 2],
    "1,000人以上": [0, 3, 0, 3],
  },
  // Q2: 生成AIの利用状況
  {
    "全く使っていない": [0, 2, 0, 0],
    "一部の人が個人的に使っている": [1, 1, 1, 0],
    "特定の部署で公式に利用している": [2, 0, 1, 1],
    "全社的に活用している": [3, 0, 1, 2],
  },
  // Q3: 最も多い業務
  {
    "資料作成やデータ入力": [1, 1, 0, 2],
    "顧客対応（メール、チャット、電話）": [1, 1, 0, 1],
    "製品の製造や管理": [0, 2, 0, 1],
    "企画やマーケティング": [1, 0, 3, 1],
  },
  // Q4: AIに助けてほしい課題
  {
    "人手不足を補いたい": [2, 1, 0, 0],
    "単純作業の時間を削減したい": [2, 1, 0, 1],
    "業務の品質のムラをなくしたい": [0, 2, 0, 3],
    "コストを削減したい": [1, 3, 0, 0],
  },
  // Q5: 新ツール導入時の反応
  {
    "とりあえず使ってみよう！と積極的": [3, 0, 2, 0],
    "まずは一部の部署で試してみる": [1, 1, 1, 1],
    "費用対効果を慎重に検討する": [0, 3, 0, 1],
    "変化には抵抗がある": [0, 3, 0, 0],
  },
  // Q6: 社内データの場所
  {
    "ほとんどが紙の書類": [0, 2, 0, 0],
    "個人のPCや共有サーバー内": [1, 1, 0, 1],
    "Google DriveやDropboxなどのクラウド上": [2, 0, 1, 2],
    "専門のデータベースシステムで管理": [1, 0, 1, 3],
  },
  // Q7: 意思決定の時間
  {
    "1ヶ月未満で即決": [3, 0, 1, 0],
    "1〜3ヶ月程度": [1, 1, 1, 1],
    "半年以上かけてじっくり": [0, 3, 0, 1],
    "ケースバイケースで予測不能": [0, 1, 0, 0],
  },
  // Q8: AI導入で期待する効果
  {
    "大幅なコスト削減": [1, 3, 0, 0],
    "新しい売上や事業の創出": [1, 0, 3, 1],
    "既存業務の圧倒的な効率化": [3, 1, 0, 1],
    "従業員の創造性向上": [1, 0, 3, 0],
  },
];

export const getLocalDiagnosis = (answers: string[]): DiagnosisResult => {
  const finalScores: Score = {
    speed: 0,
    careful: 0,
    idea: 0,
    data: 0,
  };

  answers.forEach((answer, index) => {
    // 回答が質問の選択肢に存在するか確認
    if (QUESTIONS[index] && QUESTIONS[index].options.includes(answer)) {
      const scores = scoreMap[index][answer];
      if (scores) {
        finalScores.speed += scores[0];
        finalScores.careful += scores[1];
        finalScores.idea += scores[2];
        finalScores.data += scores[3];
      }
    }
  });

  // 最もスコアが高いタイプを決定する
  // PCとスマホなど、環境によって結果が変わらないように、優先順位を明確に定義する
  let maxScore = -1;
  let resultType: keyof Score = 'careful'; // デフォルト
  
  // 優先順位: スピード導入型 > アイデア発想型 > データ基盤型 > 慎重検討型
  const typesInOrder: (keyof Score)[] = ['speed', 'idea', 'data', 'careful'];

  for (const type of typesInOrder) {
    // スコアが現在の最大値より大きい場合、結果を更新
    // 同点の場合は、先に評価された（＝優先順位の高い）タイプが維持される
    if (finalScores[type] > maxScore) {
      maxScore = finalScores[type];
      resultType = type;
    }
  }
  
  return DIAGNOSIS_TEXTS[resultType];
};
