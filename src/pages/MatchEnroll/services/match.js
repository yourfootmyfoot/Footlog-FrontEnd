/**
 *
 * @param {*} data matchEnrollData
 */
export async function postMatchEnroll(data) {
  await fetch('/api/match-enroll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
