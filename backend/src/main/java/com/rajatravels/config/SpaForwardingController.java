package com.rajatravels.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Forwards non-API, non-asset routes to the Angular index.html so client-side
 * deep links work when the SPA is served from the JAR.
 */
@Controller
public class SpaForwardingController {

    @GetMapping({"/{path:[^\\.]*}", "/{path:[^\\.]*}/{subPath:[^\\.]*}"})
    public String forward() {
        return "forward:/index.html";
    }
}
