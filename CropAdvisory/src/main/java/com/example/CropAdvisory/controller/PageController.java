package com.example.CropAdvisory.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class PageController {

    @GetMapping("/")
    @ResponseBody
    public ModelAndView home() {
        return getHomePage();
    }
    
    @GetMapping("/index")
    @ResponseBody
    public ModelAndView index() {
        return getHomePage();
    }
    
    public ModelAndView getHomePage() {
        ModelAndView modelAndView = new ModelAndView("index");
        modelAndView.addObject("pageTitle", "Smart Crop Advisory System");
        modelAndView.addObject("welcomeMessage", "Welcome to Smart Agriculture Solutions");
        return modelAndView;
    }

    @GetMapping("form")
    @ResponseBody
    public ModelAndView showForm() {
        ModelAndView modelAndView = new ModelAndView("farmer_form");
        modelAndView.addObject("pageTitle", "Crop Advisory Form");
        modelAndView.addObject("formTitle", "Provide your farming details");
        // Add any form initialization data here
        return modelAndView;
    }

    @GetMapping("recommendations")
    @ResponseBody
    public ModelAndView showRecommendations() {
        ModelAndView modelAndView = new ModelAndView("recommendations");
        modelAndView.addObject("pageTitle", "Your Recommendations");
        // Add any recommendation data here
        return modelAndView;
    }
}
