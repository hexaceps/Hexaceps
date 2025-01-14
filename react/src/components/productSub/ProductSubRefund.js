import React from 'react';
import { FaPhone } from 'react-icons/fa';

const ProductSubRefund = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '900px',
      margin: '30px auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      fontSize: '1.8rem',
      marginBottom: '20px',
    },
    hr: {
      margin: '20px 0',
      border: '1px solid #ddd',
    },
    section: {
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '1.4rem',
      color: '#333',
      marginBottom: '15px',
      borderBottom: '2px solid #007BFF',
      paddingBottom: '5px',
    },
    paragraph: {
      fontSize: '1rem',
      color: '#666',
      lineHeight: '1.6',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px',
    },
    tableCell: {
      padding: '12px 15px',
      textAlign: 'left',
      border: '1px solid #ddd',
    },
    tableHeader: {
      backgroundColor: '#f0f0f0',
      color: '#333',
    },
    listItem: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '10px',
    },
    orderedList: {
      paddingLeft: '20px',
    },
    unorderedList: {
      paddingLeft: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>반품/교환정보</h2>
      <hr style={styles.hr} />

      <section style={styles.section}>
        <h4 style={styles.sectionTitle}>HEXACEPS 반품/교환 안내</h4>
        <p style={styles.paragraph}>
          반품 시 먼저 판매자와 연락하셔서 반품사유, 택배사, 배송비, 반품지 주소 등을 협의하신 후 반품상품을 발송해 주시기 바랍니다.
        </p>
        <table style={styles.table}>
          <tbody>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>판매자 지정택배사</th>
              <td style={styles.tableCell}>롯데택배</td>
            </tr>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>반품배송비</th>
              <td style={styles.tableCell}>편도 3,000원 (최초 배송비 무료인 경우 6,000원 부과)</td>
            </tr>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>교환배송비</th>
              <td style={styles.tableCell}>6,000원</td>
            </tr>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>보내실 곳</th>
              <td style={styles.tableCell}>경기 성남시 분당구 돌마로 73 우방코아 7층 HEXACEPS</td>
            </tr>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>반품/교환 사유에 따른 요청 가능 기간</th>
              <td style={styles.tableCell}>
                구매자 단순 변심은 상품 수령 후 7일 이내 (구매자 반품배송비 부담)
                <br />
                표시/광고와 상이, 계약 내용과 다르게 이행된 경우 상품 수령 후 3개월 이내 혹은 표시/광고와 다른 사실을 안 날로부터 30일
                이내 (판매자 반품 배송비 부담)
                <br />
                둘 중 하나 경과 시 반품/교환 불가
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>반품/교환 불가능 사유</h3>
        <ol style={styles.orderedList}>
          <li style={styles.listItem}>반품요청기간이 지난 경우</li>
          <li style={styles.listItem}>
            구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우 (단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외)
          </li>
          <li style={styles.listItem}>
            구매자의 책임있는 사유로 포장이 훼손되어 상품 가치가 현저히 상실된 경우 (예: 식품, 화장품, 향수류, 음반 등)
          </li>
          <li style={styles.listItem}>
            구매자의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우 (라벨이 떨어진 의류 또는 태그가 떨어진 명품관
            상품인 경우)
          </li>
          <li style={styles.listItem}>시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우</li>
          <li style={styles.listItem}>
            고객의 요청사항에 맞춰 제작에 들어가는 맞춤제작상품의 경우 (판매자에게 회복불가능한 손해가 예상되고, 그러한 예정으로 청약철회권 행사가 불가하다는 사실을 서면 동의 받은 경우)
          </li>
          <li style={styles.listItem}>복제가 가능한 상품 등의 포장을 훼손한 경우 (CD/DVD/GAME/도서의 경우 포장 개봉 시)</li>
        </ol>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>판매자정보</h3>
        <table style={styles.table}>
          <tbody>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>상호명</th>
              <td style={styles.tableCell}>HEXACEPS (사업자 / 법인 사업자)</td>
            </tr>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>대표자</th>
              <td style={styles.tableCell}>HEXACEPS</td>
            </tr>
            <tr>
              <th style={{ ...styles.tableCell, ...styles.tableHeader }}>전화번호</th>
              <td style={styles.tableCell}> <FaPhone style={styles.icon} className='me-2'/>010-1234-1234
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>주의사항</h3>
        <ul style={styles.unorderedList}>
          <li style={styles.listItem}>전자상거래 등에서의 소비자보호에 관한 법률에 의한 반품규정이 판매자가 지정한 반품 조건보다 우선합니다.</li>
          <li style={styles.listItem}>
            전자상거래 등에서의 소비자보호에 관한 법률에 의거하여 미성년자가 물품을 구매하는 경우, 법정대리인이 동의하지 않으면 미성년자 본인 또는 법정대리인이 구매를 취소할 수 있습니다.
          </li>
          <li style={styles.listItem}>
            전기용품 및 생활용품 안전관리법 및 어린이제품 안전 특별법 규정에 의한 안전관리대상 품목인 전기용품, 생활용품, 어린이제품을 판매 또는 구매하실 경우에는 해당 제품이 안전인증, 안전확인, 공급자적합성확인, 안전기준준수 적용 제품인지 확인하시기 바랍니다.
          </li>
        </ul>
      </section>      
    </div>
  );
};

export default ProductSubRefund;
