# test_practiceExam.py

import pytest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

class TestPracticeExam:
    def setup_method(self, method):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 20)
    
    def teardown_method(self, method):
        self.driver.quit()

    def test_practice_exam_submission(self):
        driver = self.driver
        wait = self.wait

        # Open app and login
        driver.get("https://sproj-prototype1.vercel.app/")
        driver.find_element(By.LINK_TEXT, "Login").click()
        driver.find_element(By.NAME, "email").send_keys("saad.khilji@hotmail.com")
        driver.find_element(By.NAME, "password").send_keys("Saad2003@")
        driver.find_element(By.CSS_SELECTOR, ".py-3").click()

        # Navigate to Practice Exam
        wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Practice Online"))).click()
        wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'O Level')]"))).click()

        # Select Subject and Year
        wait.until(EC.element_to_be_clickable((By.XPATH, "//div[contains(text(),'Pak Studies')]"))).click()
        wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'2023')]"))).click()

        # Wait for questions to load and select first question
        wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".question-card")))

        # Click first answer (assuming buttons or radios exist)
        first_answer = driver.find_element(By.CSS_SELECTOR, ".question-card:first-child .answer-option")
        first_answer.click()

        # Submit answer
        submit_button = driver.find_element(By.XPATH, "//button[contains(text(),'Submit Answer')]")
        submit_button.click()

        # Check for success feedback
        wait.until(EC.visibility_of_element_located((By.XPATH, "//div[contains(text(),'Answer submitted')]")))

