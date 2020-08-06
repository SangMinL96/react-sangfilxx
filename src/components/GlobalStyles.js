import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyles = createGlobalStyle`
 ${reset};
a{
 text-decoration:none;
  color:inherit;
}
*{
  box-sizing:border-box;
}
body{
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-size:1rem;
background-color:rgba(20,20,20,1);
padding-top:3.3em;
color:white;

}
`;
export default GlobalStyles;
