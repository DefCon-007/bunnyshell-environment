// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";
import { addTodo, deleteTodoById, getTodo } from "layouts/pages/todo/service";
import { useEffect, useState } from "react";
// Routes
import routes from "routes";
// Images

function Todo() {
  const [todos, setTodo] = useState([]),
    [newTodo, setNewTodo] = useState(""),
    [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getTodo(setTodo);
  }, [refresh]);

  let todoElements;

  if (todos.length === 0) {
    todoElements = <MKTypography variant="h3">No todos found</MKTypography>;
  } else {
    const allTodos = todos.map((todo, index) => (
      <Stack direction="row" spacing={1} mt={3} key={index}>
        <MKTypography variant="h4">{todo.todo}</MKTypography>
        <MKButton onClick={() => deleteTodoById(todo.id, () => setRefresh(!refresh))}>
          Clear
        </MKButton>
      </Stack>
    ));
    todoElements = (
      <>
        <MKTypography variant="h3">Following are the todos</MKTypography>
        {allTodos}
      </>
    );
  }

  return (
    <MKBox component="header" position="relative">
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-pro-react",
          label: "buy now",
          color: "info",
        }}
        sticky
      />
      {/* <MKBox component="nav" position="absolute" top="0.5rem" width="100%">
        <Container>
          <Grid container flexDirection="row" alignItems="center">
            <MKTypography
              component={Link}
              href="/"
              variant="button"
              fontWeight="regular"
              py={0.8125}
              mr={2}
            >
              Material Design
            </MKTypography>
            <MKButton variant="outlined" sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}>
              <MKBox component="i" className="fas fa-bars" />
            </MKButton>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              my={0}
              mx="auto"
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  Home
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  About Us
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  Contact Us
                </MKTypography>
              </MKBox>
            </MKBox>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              m={0}
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" className="fab fa-twitter" />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" className="fab fa-facebook" />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" className="fab fa-instagram" />
                </MKTypography>
              </MKBox>
            </MKBox>
          </Grid>
        </Container>
      </MKBox> */}
      <MKBox
        display="flex"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
            `${linearGradient(rgba(gradients.light.main, 0.5), rgba(gradients.light.state, 0.5))}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} md={7} lg={6} flexDirection="column" justifyContent="center">
            <MKTypography
              variant="h1"
              mb={3}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Todo List
            </MKTypography>
            <MKInput
              label="Write your todo ...."
              pr={6}
              mr={6}
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
            />

            <Stack direction="row" spacing={1} mt={3}>
              <MKButton
                onClick={() => {
                  addTodo(newTodo, () => {
                    setRefresh(!refresh);
                    setNewTodo("");
                  });
                }}
              >
                Add
              </MKButton>
            </Stack>

            <br />

            {todoElements}
          </Grid>
        </Container>
      </MKBox>
      <MKBox pt={6} px={1}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </MKBox>
  );
}

export default Todo;
