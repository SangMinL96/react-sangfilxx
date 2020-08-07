import { useReducer, useEffect, useCallback } from "react";
import axios from "axios";
function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };

    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`action type: ${action.type}`);
  }
}

function useAsync(URL, deps = [], skip = true) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });
  const fatchData = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get(URL);
      dispatch({ type: "SUCCESS", data: response.data });
    } catch (e) {
      dispatch({ type: "ERROR", error: e });
    }
  }, [URL]);
  useEffect(() => {
    if (skip) {
      return;
    }
    fatchData();
    //eslint-disable-next-line
  }, deps);
  return [state, fatchData];
}

export default useAsync;

// async function getMain() {
//   const response = await axios.get(
//     "https://api.themoviedb.org/3/movie/583083?api_key=cc3aed3fa1f0feef67c25879a942c3db&language=en-US"
//   );
//   return response.data;
// }

// 자세한 사용법.
// const [state, fatchData] = useAsync(URL, [], true);
//   const [userId, setUserId] = useState(null);
//   const { data, error, loading } = state;
//   if (loading) return <div>로딩중...</div>;
//   if (error) return <div>에러가 발생</div>;
//   if (!data) return <button onClick={fatchData}>불러오기</button>;
//   console.log(userId);
//   return (
//     <>
//       <ul>
//         {data.map((user) => (
//           <li key={user.id} onClick={() => setUserId(user.id)}>
//             {user.username}({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={fatchData}>다시불러오기</button>
//       <div> {userId && <User id={userId} />}</div>
//     </>
//   );
// }

// export default UseStateApi;
