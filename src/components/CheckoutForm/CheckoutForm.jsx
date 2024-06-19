import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './CheckoutForm.css'
import { ImSpinner9 } from 'react-icons/im'
import { useEffect, useState } from 'react'




import { useNavigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth'
import useAxiosSecure from '../Hooks/useAxiosSecure '
import useCart from '../Hooks/useCart'
import Swal from 'sweetalert2'
const CheckoutForm = ({ grandTotal }) => {
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState()
    const [cardError, setCardError] = useState('')
    const [processing, setProcessing] = useState(false)
    const [cartData, refetch] = useCart();
    useEffect(() => {
        // fetch client secret
        if (grandTotal > 1) {
            getClientSecret({ price: grandTotal })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [grandTotal])


    const handleClearCart = async () => {
        const response = await axiosSecure.delete(`/deleteAllCartInformation`);
        if (response.data.deletedCount > 0) {
            console.log("cart was cleared");

        }
    }

    //   get clientSecret
    const getClientSecret = async price => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, price)
        console.log('clientSecret from server--->', data)
        setClientSecret(data.clientSecret)
    }

    const handleSubmit = async event => {
        // Block native form submission.
        event.preventDefault()
        setProcessing(true)
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement)

        if (card == null) {
            return
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('[error]', error)
            setCardError(error.message)
            setProcessing(false)
            return
        } else {
            console.log('[PaymentMethod]', paymentMethod)
            setCardError('')
        }

        // confirm payment
        const { error: confirmError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName,
                    },
                },
            })

        if (confirmError) {
            console.log(confirmError)
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }

        if (paymentIntent.status === 'succeeded') {
            console.log(paymentIntent)
            // 1. Create payment info object
            const paymentInfo = {
                transactionId: paymentIntent.id,
                date: new Date(),
                cartData: cartData, // include cartData
                userEmail: user?.email, // additional information
                userName: user?.displayName, // additional information
                totalAmount: grandTotal // additional information
            }

            console.log(paymentInfo)
            try {
                // 2. save payment info in booking collection (db)
                const { data } = await axiosSecure.post('/booking', paymentInfo)

                if (data.insertedId) {
                    handleClearCart();
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment SuccessFul",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


                // navigate('/dashboard/my-bookings')
            } catch (err) {
                console.log(err)
            }
        }

        setProcessing(false)
    }

    return (
        <>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <div className='flex justify-center'>
                <button className="btn w-[132px] p-2 text-xl" onClick={() => document.getElementById('my_modal_2').showModal()}>Pay</button>
            </div>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">

                    <div className='mx-auto'>
                        <form onSubmit={handleSubmit}>
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />

                            <div className='flex mt-2 justify-start gap-5'>
                                <button
                                    disabled={!stripe || !clientSecret || processing}
                                    type='submit'
                                    className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                                >
                                    {processing ? (
                                        <ImSpinner9 className='animate-spin m-auto' size={24} />
                                    ) : (
                                        `Pay ${grandTotal}`
                                    )}
                                </button>

                            </div>
                        </form>
                        {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}



export default CheckoutForm