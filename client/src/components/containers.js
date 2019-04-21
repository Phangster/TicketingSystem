import styled from "styled-components";

export const AppContainer = styled.div`
  height: 100vh;
  width: 80%
  position: absolute;
`;

export const NavContainer = styled.div`
  height: 100vh;
  width: 100%
  position: absolute;
`;

export const HomeContainer = styled.div`
  height: 100vh;
  width: 100%
  position: absolute;
  text-align: center;
  margin-top: 3rem;
`;

export const DashboardContainer = styled.div`
  width: 100%;
  margin: 2em;
  padding: 2em;
  margin-top: 2em;
  position: absolute;
`;

export const Container = styled.div`
  width: 30%;
  margin: 0 auto;
  padding: 2em;
  margin-top: 5em;
  box-shadow: 4px 4px 8px 2px rgba(0,0,0,0.3);
`;

export const LeftContainer = styled.div`
  margin-left: 220px;
  width: 100%;
  height: 100vh;
  position: absolute;


`;
export const RightContainer = styled.div`
  position: absolute;
`;

export const StatusDist = styled.div`
  text-align: center;
  margin-bottom: 1em;
`;

export const InnerContainer = styled.div`
padding: 20px;
`;

export const Navigation = styled.div`
  width: 220px;
  flex-shrink: 0;
  background: #fff;
  height: 100vh;
  border: 1px solid rgba(0, 0, 0, 0.125);
  position: absolute
`;
export const Body = styled.div`
  padding: 12px;
  height: 100vh;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

export const ExampleContainer = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  height: calc(100vh - 40px);
`;

export const ExampleNavigation = styled(Navigation)`
  height: 100%;
  margin-right: 4px;
  border: 1px solid rgba(0, 0, 0, 0.125);  
`;

export const ExampleBody = styled.div`  
  background: #fff;
  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.125);
`;
