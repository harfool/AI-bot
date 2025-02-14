import { Box, Card, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import DescriptionRounded from "@mui/icons-material/DescriptionRounded";
import FormatAlignLeftOutlined from "@mui/icons-material/FormatAlignLeftOutlined";
import ChatRounded from "@mui/icons-material/ChatRounded";
const HomePage = () => {
  const nevigate = useNavigate()
  return (
   <>
    <Box sx={{display : "flex" , flexDirection : "row"}}>
    <Box p={2} >
      <Typography variant="h2" mb={2} fontWeight="bold" >
        Text Generator
      </Typography>
      <Card 
      onClick={()=>{nevigate("/summary")}}
      sx={{
        boxShadow: 2,
        borderRadius: 5,
        height: 190,
        width: 200,
        "&:hover": {
          border: 2,
          boxShadow: 0,
          borderColor: "primary.dark",
          cursor: "pointer",
        },
      }}
      >
<DescriptionRounded  sx={{ fontSize: 40, color: "primary.main", mt: 2, ml: 2 }} />
<Stack p={5} pt={0} px={2.3} >
<Typography variant="h5" fontWeight="bold" ></Typography>
<Typography variant="h6" >Summarise your text</Typography>
</Stack>

      </Card>
    </Box>
    <Box p={2} >
      <Typography variant="h2" mb={2} fontWeight="bold" >
        Code Reviewer
      </Typography>
      <Card 
      onClick={()=>{nevigate("/paragraph")}}
      sx={{
        boxShadow: 2,
        borderRadius: 5,
        height: 190,
        width: 200,
        "&:hover": {
          border: 2,
          boxShadow: 0,
          borderColor: "primary.dark",
          cursor: "pointer",
        },
      }}
      >
<FormatAlignLeftOutlined  sx={{ fontSize: 40, color: "primary.main", mt: 2, ml: 2 }} />
<Stack p={5} pt={0} px={2.3} >
<Typography variant="h5" fontWeight="bold" >Code Review </Typography>
<Typography variant="h6" >Review your JS code  </Typography>
</Stack>

      </Card>
    </Box>
    </Box>

   </>
  )
}

export default HomePage