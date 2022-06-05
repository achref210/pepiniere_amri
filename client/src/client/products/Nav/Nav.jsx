import React from "react";
import { useState } from "react";
import {Container,Stack, Avatar} from '@mui/material';
import fruits from '../../../assets/nav/fruits.png'
import fleur from '../../../assets/nav/fleur.png'
import legume from '../../../assets/nav/legume.png'
import olivier from '../../../assets/nav/olivier.png'
import { motion, AnimateSharedLayout } from "framer-motion";
import { useDispatch} from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
/**
 * This is an example of animating between different components in Framer Motion 2.
 *
 * By wrapping a tree with AnimateSharedLayout, children can be given a layoutId.
 *
 * When a component with a layoutId is removed and a new one with the same layoutId
 * is added elsewhere, the new component will animate from the old one.
 *
 * The outline being animated here is four different components, animated like one.
 */

export default function App({selected, setSelected}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container style={{width:"60%",position:"center"}}>
    <AnimateSharedLayout>
      <ul>
      <Stack direction="row" spacing={20}>
        {imagesNames.map((imageName,index) => (
          <Item
            key={imageName}
            color={"#D9E5EF"}
            index={index}
            image={index && selected === imageName}
            isSelected={selected === imageName}
            onClick={() => {
              if(selected===imageName)
              {
                setSelected("no")
              } else {
                setSelected(imageName)
              }
            }}
          />
        ))}
        
        </Stack>
      </ul>
    </AnimateSharedLayout>
    </Container>
  );
}

function Item({ color, index, image, isSelected, onClick }) {
  return (
    <li className="item" onClick={onClick} style={{ backgroundColor: color }}>
      {isSelected ? (
        <motion.div
          layoutId="outline"
          className="outline"
          initial={false}
          animate={{ borderColor: color }}
          transition={spring}
        >
               <motion.img initial={{x:10,y:10}} animate={{opacity: [0,1]}} src={images[index]}/>       
        </motion.div>
      ):(
               <motion.img src={images[index]}/>       
      )}
    </li>
  );
}

const imagesNames = ["fruits","decoration","vegetables","oliviers"];
const images = [fruits,fleur,legume,olivier]

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30
};