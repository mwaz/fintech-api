const CompoundInterestPositive = {
    "principle": 10000,
    "rates": 12.4,
    "period": 24,
    "frequencyOfApplyingInterest": 4
  }

const CompoundInterestInvalidDetails = {
    "principle": 0,
    "period": 24,
    "frequencyOfApplyingInterest": 4
}

const SimpleInterestPositive = {
    "principle": 10000,
    "rates": 12.4,
    "period": 24,
}

const SimpleInterestInvalidDetails = {
    "rates": 12.4,
    "period": 12,
}

export default {
      CompoundInterestPositive,
      CompoundInterestInvalidDetails,
      SimpleInterestPositive,
      SimpleInterestInvalidDetails
  }